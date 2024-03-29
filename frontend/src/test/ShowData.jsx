// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const ShowData = () => {
//   const [data, setData] = useState([]);
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/v1/getf/getdata"
//       );
//       console.log(response.data);
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   return <div>{JSON.stringify(data)}</div>;
// };

// export default ShowData;


import React, { useState, useEffect } from 'react';

function MediaGallery() {
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000/api/v1/getf/getdata');
      const data = await response.json();
      setMediaData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function createMediaElement(media) {
    if (media.type === 'video') {
      return (
        <video controls width="400">
          <source src={media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (media.type === 'image') {
      return <img src={media.url} alt="Image" width="400" />;
    }
  }

  return (
    <div className="media-gallery">
      {mediaData.map((media, index) => (
        <div key={index} className="media-item">
          {createMediaElement(media)}
        </div>
      ))}
    </div>
  );
}

export default MediaGallery;
