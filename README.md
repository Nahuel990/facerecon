# Face Recognition Application

This application utilizes a Flask backend for face recognition and a React frontend for capturing images from a webcam. It is containerized using Docker for easy deployment.

## Key Features
- **Real-Time Face Recognition**: Captures images every 3 seconds from the webcam and sends them to the backend for processing.
- **Dynamic Updates**: Displays recognized names or a message if no one is recognized.
- **User-Friendly Interface**: Simple layout with a live webcam feed and recognition results.


## Getting Started

### Image Upload
Images should be placed in the `images` folder with the format `name.jpg`.
To build and run the application, execute the following command:

```
docker-compose up --build
```

and check

```
http://localhost:3000/
```

## Limitations
The face recognition accuracy may not be optimal for Asian individuals due to limitations in the underlying face recognition library.

## Docker Setup
The application is composed of two services defined in the `docker-compose.yml` file:

- **Node App**:
  - Builds from `Dockerfile.node` and runs on port 3000.
  - Uses environment variable `NODE_OPTIONS=--openssl-legacy-provider`.

- **Python App**:
  - Builds from `Dockerfile.python` and runs on port 5000 (Flask app).
  - Mounts the `./images` directory to `/app/images` in the container for image access.

## License
This project is licensed under the MIT License.
