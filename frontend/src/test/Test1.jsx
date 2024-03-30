import React, { useState } from "react";
import axios from "axios";

const Test1 = () => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const uploadFile = async (file, type) => {
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      type === "image" ? "image_preset" : "videos_preset"
    );

    try {
      let cloudName = "dcnvhqmfd";
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      const vidUrl = await uploadFile(video, "video");

      await axios.post(`http://localhost:5000/api/v1/files/upld/vid`, {
        vidUrl,
      });

      setVideo(null);

      console.log("Video upload success!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    try {
      const imgUrlPromises = images.map(async (image) => {
        return await uploadFile(image, "image");
      });
      const imgUrls = await Promise.all(imgUrlPromises);

      await axios.post(`http://localhost:5000/api/v1/files/upld/img`, {
        imgUrls,
      });

      setImages([]);

      console.log("Images upload success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleVideoSubmit} className="mb-8">
        <label htmlFor="video" className="block mb-2">
          Video:
        </label>
        <input
          type="file"
          accept="video/*"
          id="video"
          onChange={(e) => setVideo(e.target.files[0])}
          className="border border-gray-300 rounded p-2 mb-2"
        /> <br />
        <button
          type="submit"
          className=" btn btn-info text-black bg-blue-100  rounded hover:bg-blue-600"
          style={{ border: "1px solid balck", color: "black" }}
        >
          Upload Video
        </button>
      </form>
      <form onSubmit={handleImageSubmit} className="mb-8">
        <label htmlFor="img" className="block mb-2">
          Images:
        </label>
        <input
          type="file"
          accept="image/*"
          id="img"
          onChange={(e) => setImages(Array.from(e.target.files))}
          multiple
          className="border border-gray-300 rounded p-3 mb-2"
        />
        <button
          type="submit"
          className=" btn btn-info text-black bg-blue-100  rounded hover:bg-blue-600"
          style={{ border: "1px solid balck", color: "black" }}
        >
          Upload Images
        </button>
      </form>
    </div>
  );
};

export default Test1;






