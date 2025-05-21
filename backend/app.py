from flask import Flask, request, jsonify, redirect, render_template_string, send_file
import os
import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications import Xception
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D
from PIL import Image
import io
import time
import pdfkit
import jinja2
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  

# Model paths
IMAGE_MODEL_PATH = os.path.join(os.path.dirname(__file__), "18JanModel.keras")
VIDEO_MODEL_PATH = os.path.join(os.path.dirname(__file__), "lstm_attention_model_2.keras")

# Load the image prediction model
try:
    image_model = load_model(IMAGE_MODEL_PATH)
except Exception as e:
    app.logger.error(f"Error loading image model: {str(e)}")
    image_model = None

# Load the video prediction model
try:
    video_model = load_model(VIDEO_MODEL_PATH)
except Exception as e:
    app.logger.error(f"Error loading video model: {str(e)}")
    video_model = None

# Create Xception feature extractor
def get_xception_feature_extractor():
    base_model = Xception(weights='imagenet', include_top=False, input_shape=(299, 299, 3))
    output = GlobalAveragePooling2D()(base_model.output)
    model = Model(inputs=base_model.input, outputs=output)
    return model

feature_extractor = get_xception_feature_extractor()

# Image preprocessing function
def preprocess_image(image, target_size):
    try:
        image = image.resize(target_size)
        image = np.array(image) / 255.0
        image = np.expand_dims(image, axis=0)
        return image
    except Exception as e:
        raise ValueError(f"Error during image preprocessing: {str(e)}")

# Video processing functions
def extract_frames_from_video(video_path):
    """Extract frames from video ensuring sufficient frames for sequence creation"""
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError("Failed to open video file")
    
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Calculate frame interval to get enough frames
    # Aim to get at least 40 frames to ensure we can create sequences
    target_frames = 40
    frame_interval = max(1, total_frames // target_frames)
    
    frames = []
    frame_count = 0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        if frame_count % frame_interval == 0:
            if frame is not None:
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frames.append(frame)
                
        frame_count += 1

    cap.release()
    
    # If we don't have enough frames, duplicate existing ones
    while len(frames) < 20:
        frames.extend(frames[:20-len(frames)])
    
    return frames

def extract_features_from_frames(frames, feature_extractor):
    features = []
    for frame in frames:
        img = cv2.resize(frame, (299, 299))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        feature = feature_extractor.predict(img_array, verbose=0)
        features.append(feature[0])
    return np.array(features)

def create_sequences(features, sequence_length=20):
    sequences = []
    for i in range(0, len(features) - sequence_length + 1):
        sequence = features[i:i + sequence_length]
        sequences.append(sequence)
    return np.array(sequences)

# Video prediction endpoint
@app.route('/predict-video', methods=['POST'])
def predict_video():
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    if video_model is None:
        return jsonify({"error": "Video model is not available"}), 500

    video_file = request.files['video']
    if not video_file.filename:
        return jsonify({"error": "Empty filename"}), 400

    allowed_extensions = {'mp4', 'avi', 'mov', 'wmv'}
    if not ('.' in video_file.filename and \
            video_file.filename.rsplit('.', 1)[1].lower() in allowed_extensions):
        return jsonify({"error": "Invalid video format. Supported formats: MP4, AVI, MOV, WMV"}), 400

    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    secure_filename = f"video_{timestamp}_{hash(video_file.filename)}.mp4"
    video_path = os.path.join(upload_dir, secure_filename)
    
    try:
        video_file.save(video_path)
        
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            raise ValueError("Failed to open video file")
            
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = frame_count / fps if fps > 0 else 0
        cap.release()

        if duration > 25:
            os.remove(video_path)
            return jsonify({"error": "Video duration exceeds 25 seconds"}), 400

        frames = extract_frames_from_video(video_path)
        if len(frames) < 20:
            raise ValueError("Not enough frames extracted from video")

        features = extract_features_from_frames(frames, feature_extractor)
        sequences = create_sequences(features)

        if len(sequences) == 0:
            raise ValueError("Failed to create sequences from frames")

        predictions = video_model.predict(sequences, verbose=0)

        # Identify frames where fakeness is detected
        fake_frames = []
        for i, pred in enumerate(predictions):
            if pred >= 0.5:
                fake_frames.append({
                    "frame_index": i * (len(frames) // len(predictions)),  # Approximate frame index
                    "time_sec": round((i * (duration / len(predictions))), 2),  # Approximate time in seconds
                    "prediction": float(pred)
                })

        average_prediction = float(np.mean(predictions))
        
        result = {
            "prediction": average_prediction,
            "label": "Fake" if average_prediction >= 0.5 else "Real",
            "statistics": {
                "average_prediction": average_prediction,
                "min_prediction": float(np.min(predictions)),
                "max_prediction": float(np.max(predictions)),
                "std_deviation": float(np.std(predictions)),
                "total_frames_processed": len(frames),
                "sequences_analyzed": len(sequences)
            },
            "fake_detections": fake_frames  # Add fake frame detection info
        }

        return jsonify(result)

    except Exception as e:
        app.logger.error(f"Video processing error: {str(e)}")
        return jsonify({"error": str(e)}), 500

    finally:
        if os.path.exists(video_path):
            try:
                os.remove(video_path)
            except Exception as e:
                app.logger.error(f"Error removing temporary file: {str(e)}")
     
# Image prediction endpoint
@app.route("/predict-img", methods=["POST"])
def predict_img():
    start_time = time.time()
    print('Received files:', request.files)
    print('Request form:', request.form)
    print('Request headers:', request.headers)

    if "image" not in request.files:
        print('No image key in files')
        return jsonify({"error": "No image file provided", "files": list(request.files.keys())}), 400

    if image_model is None:
        return jsonify({"error": "Image model is not available"}), 500

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        if image.mode != "RGB":
            image = image.convert("RGB")

        processed_image = preprocess_image(image, target_size=(299, 299))
        prediction = image_model.predict(processed_image)[0]
        confidence = float(prediction[0])
        result = "real" if confidence > 0.5 else "fake"

        return jsonify({
            "result": result,
            "confidence": confidence,
            "processing_time": time.time() - start_time
        })

    except ValueError as e:
        return jsonify({"error": f"Image processing error: {str(e)}"}), 400
    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(debug=True)