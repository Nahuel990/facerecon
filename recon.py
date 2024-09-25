import face_recognition
import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

# Directory containing images
image_directory = "/facerecon/images"
known_face_encodings = []
known_face_names = []

# Load images and encode faces
for filename in os.listdir(image_directory):
    if filename.endswith(".jpg"):  # Only process .jpg files
        image_path = os.path.join(image_directory, filename)
        image = face_recognition.load_image_file(image_path)
        encodings = face_recognition.face_encodings(image)
        if encodings:  # Ensure there are encodings found
            known_face_encodings.append(encodings[0])
            known_face_names.append(os.path.splitext(filename)[0])  # Use filename without extension as name

@app.route('/recognize', methods=['POST'])
def recognize_face():
    # Get the image from the request
    file = request.files['image']
    img = face_recognition.load_image_file(file)

    # Convert to RGB format
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Find all face locations and encodings
    face_encodings = face_recognition.face_encodings(rgb_img)

    recognized_names = set()  # Use a set to avoid duplicates

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        if True in matches:
            first_match_index = matches.index(True)
            recognized_names.add(known_face_names[first_match_index])

    return jsonify(list(recognized_names))

if __name__ == "__main__":
    app.run(debug=True)
