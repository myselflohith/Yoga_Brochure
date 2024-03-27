import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileType(e.target.name);
  };

  const handleUpload = async () => {
    if (!file || !fileType) {
      return alert("Please select a file and file type");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/insert/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file");
    }
  };

  return (
    <div style={{ display: "grid" }}>
      <input type="file" name="image" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>

      <input type="file" name="video" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>

      <input type="file" name="audio" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Audio</button>

      <p>{uploadStatus}</p>
    </div>
  );
};

export default Test;
