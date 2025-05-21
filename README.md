# 🔍 DIGI - Deepfake Inspection and Genuine Identification using Deep Learning

DIGI is an AI-powered project that detects manipulated media using state-of-the-art deep learning models. It provides a complete pipeline for identifying deepfake images and videos and is built with both a **Flask backend** and an intuitive **frontend interface**.

---

## 🎯 Objective

In an era where synthetic media is rapidly increasing, DIGI aims to:
- Detect deepfake images and videos
- Identify genuine content with high confidence
- Provide a simple UI/UX for users to upload and inspect media
- Support awareness and safety in digital media consumption

---

## 🛠️ Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | HTML, CSS, JavaScript, NextJS |
| Backend   | Flask (Python)     |
| Models    | CNN (XceptionNet, EfficientNet), LSTM for video |
| Data      | OpenForensics, Celeb-DF v2 |
| Others    | TensorFlow/Keras, OpenCV, NumPy, Pandas |

---

## 📁 Project Structure

DIGI/
├── frontend/ # Frontend static and dynamic files
├── backend/ # Flask backend with APIs and ML logic
└── README.md # Main project overview (this file)


---

## 📊 Datasets Used

- **Images**: OpenForensics – 50,000 images in-the-wild with multiple face instances  
- **Videos**: Celeb-DF v2 – 1000 real and deepfake videos  

> Note: Datasets are large and available upon request or directly via official sources.

---

## 🧠 ML Models

### Images
- **XceptionNet**
- **EfficientNetB5**
- Trained on OpenForensics
- Input: Face-cropped images

### Videos
- **Xception + LSTM**
- Frame-level feature extraction and temporal modeling
- Trained on Celeb-DF v2

---

## 🚀 How to Run

1. Clone the repo:
    ```bash
    git clone https://github.com/zaim03767/DIGI.git
    cd DIGI
    ```

2. Setup the backend:
    See [backend/README.md](./backend/README.md)

3. Run frontend:
    Open `index.html` in any browser (adjust to your implementation)

---

## 🧪 Performance Metrics

| Model              | Accuracy | Dataset        |
|-------------------|----------|----------------|
| EfficientNetB5    | 97%    | OpenForensics  |
| Xception + LSTM   | 96%    | Celeb-DF v2    |

---

## 🏆 Achievements

- Featured in Final Year Project Showcase
- Selected for interview screenings based on this project

---