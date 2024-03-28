import React, { useState } from "react";
import axios from "axios";

const Test1 = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : video);
    data.append(
      "upload_preset",
      type === "image" ? "image_preset" : "videos_preset"
    );

    try {
      let cloudName = "dfdgmkmhr";
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       setLoading(true);

  //       const imgUrl = await uploadFile("image");

  //       const videoUrl = await uploadFile("video");

  //       await axios.post(`http://localhost:5000/api/v1/files/upld`, {
  //         imgUrl,
  //         videoUrl,
  //       });

  //       setImg(null);
  //       setVideo(null);

  //       console.log("File upload success!");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handlevid = async (e) => {
    e.preventDefault();
    try {
      const videoUrl = await uploadFile("video");
  
      await axios.post(`http://localhost:5000/api/v1/files/upld/vid`, {
        videoUrl,
      });
      setVideo(null);

      console.log("File upload success!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleimg = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await uploadFile("image");
    

      await axios.post(`http://localhost:5000/api/v1/files/upld/img`, {
        imgUrl,
      });
      setImg(null);
      console.log("File upload success!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handlevid}>
        <div>
          <label htmlFor="video">Video:</label>
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={(e) => setVideo((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>
      <br />
      <form onSubmit={handleimg}>
        <div>
          <label htmlFor="img">Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => setImg((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Test1;
