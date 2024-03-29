import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ShowData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/getf/getdata"
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, data.length - 1));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={prevPage} disabled={currentPage === 0}>
        Previous
      </button>
      <div className="flip-container">
        {data.length > 0 && (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }} // Adding smooth transition with easeInOut
            className="w-full max-w-screen-lg h-80 border border-gray-300 overflow-hidden flip-card"
            style={{
              backgroundImage: `url(${data[currentPage].url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "500px",
              borderRadius: "10px",
            }}
          />
        )}
      </div>
      <button onClick={nextPage} disabled={currentPage === data.length - 1}>
        Next
      </button>
    </div>
  );
};

export default ShowData;
