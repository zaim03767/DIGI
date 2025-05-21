# 🧠 DIGI Backend - Flask Application

This folder contains the backend of the **DIGI** project, built using **Flask**, a lightweight Python web framework. The backend provides API endpoints to support the front-end application for deepfake detection and analysis.

---

## 🚀 Features

- RESTful API using Flask
- Integration with deep learning models
- Handles image/video uploads and inference
- JSON responses for easy frontend integration
- Modular and easy to extend

---

## 📁 Folder Structure

backend/
│
├── app.py # Main Flask application
├── requirements.txt # Python dependencies
└── README.md # This file

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/zaim03767/DIGI.git
cd DIGI/backend
python -m venv venv
venv\Scripts\activate    # On Windows
# source venv/bin/activate  # On Linux/Mac

pip install -r requirements.txt

python app.py