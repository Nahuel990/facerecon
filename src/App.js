import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import './App.css'; // Ensure this file contains the updated CSS

const App = () => {
  const [recognizedNames, setRecognizedNames] = useState([]);
  const webcamRef = useRef(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
  
    const formData = new FormData();
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    formData.append('image', blob, 'image.jpg');
  
    const apiResponse = await fetch('http://localhost:5000/recognize', {
      method: 'POST',
      body: formData,
    });
  
    const data = await apiResponse.json();
    setRecognizedNames(data);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 3000); // Capture every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="left">
        <div className="logo">
          <img src={require('./logo.png').default} alt="Logo" />
        </div>
        <div className="recognized-names">
          {recognizedNames.length > 0 ? (
            recognizedNames.map((name, index) => (
              <h2 key={index}>Welcome, {name}! </h2>
            ))
          ) : (
            <h2>No one recognized</h2>
          )}
        </div>
      </div>
      <div className="right">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default App;
