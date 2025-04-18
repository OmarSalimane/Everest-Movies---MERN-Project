import React, { useState, useRef } from "react";
import "../styles/SceneRecognition.css";

const SceneRecognition = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const toggleTool = () => {
    setIsOpen(!isOpen);
    // Reset state when closing
    if (isOpen) {
      resetState();
    }
  };

  const resetState = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    setError(null);
    const file = e.target.files[0];

    if (!file) return;

    // Check file type
    if (!file.type.match("image.*")) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(
        "http://localhost:5000/api/recognize-scene",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error recognizing scene:", err);
      setError("Failed to analyze image. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="scene-recognition-container">
      <button
        className="scene-recognition-toggle"
        onClick={toggleTool}
        title="Identify movie or TV scene"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      </button>

      {isOpen && (
        <div className="scene-recognition-window">
          <div className="scene-recognition-header">
            <h3>Scene Recognition</h3>
            <button className="close-button" onClick={toggleTool}>
              ×
            </button>
          </div>

          <div className="scene-recognition-content">
            {!result && (
              <form onSubmit={handleSubmit}>
                <div className="upload-area" onClick={triggerFileInput}>
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="image-preview"
                    />
                  ) : (
                    <div className="upload-placeholder">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                        <rect x="16" y="2" width="6" height="6" rx="1"></rect>
                        <circle cx="9" cy="13" r="3"></circle>
                      </svg>
                      <p>Click to upload an image</p>
                      <span>or drag and drop</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="file-input"
                  />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button
                  type="submit"
                  className="recognize-button"
                  disabled={!image || isLoading}
                >
                  {isLoading ? "Analyzing..." : "Recognize Scene"}
                </button>
              </form>
            )}

            {isLoading && (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Analyzing your image...</p>
              </div>
            )}

            {result && (
              <div className="result-container">
                <div className="result-image">
                  <img src={preview} alt="Uploaded scene" />
                </div>

                <div className="result-details">
                  <h4>{result.title}</h4>

                  <div className="result-info">
                    <p>
                      <strong>Type:</strong> {result.type}
                    </p>
                    <p>
                      <strong>Season:</strong> {result.season || "N/A"}
                    </p>
                    <p>
                      <strong>Episode:</strong> {result.episode || "N/A"}
                    </p>
                    <p>
                      <strong>Release Year:</strong> {result.year}
                    </p>
                    <p>
                      <strong>Confidence:</strong> {result.confidence}%
                    </p>
                  </div>

                  <p className="scene-description">{result.description}</p>

                  <div className="actor-list">
                    <h5>Actors in scene:</h5>
                    <ul>
                      {result.actors &&
                        result.actors.map((actor, index) => (
                          <li key={index}>{actor}</li>
                        ))}
                    </ul>
                  </div>

                  <div className="action-buttons">
                    <button
                      className="action-button watch"
                      onClick={() =>
                        (window.location.href = `/media/${result.mediaId}`)
                      }
                    >
                      Watch Now
                    </button>
                    <button
                      className="action-button retry"
                      onClick={resetState}
                    >
                      Try Another Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SceneRecognition;
