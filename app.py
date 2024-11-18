from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# 모델 로드
model = tf.keras.models.load_model('C:/Users/pc/Desktop/project_car_damage/car_damage_detection_model.h5')  # 저장된 모델의 경로

def preprocess_image(image):
    image = image.resize((256, 256))  # 모델의 입력 크기에 맞게 조정
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/upload', methods=['POST'])
def upload_images():
    files = request.files.getlist('images')
    results = []
    
    for file in files:
        try:
            image = Image.open(io.BytesIO(file.read())).convert('RGB')
            processed_image = preprocess_image(image)
            prediction = model.predict(processed_image)

            # 예측값에 따라 파손 여부 결정
            is_damaged = bool(prediction[0][0] < 0.5)
            result = "Damaged" if is_damaged else "Not Damaged"
            results.append(result)
        except Exception as e:
            results.append(f"Error processing image: {str(e)}")

    return jsonify({"results": results})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)