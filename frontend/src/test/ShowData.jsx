import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ShowData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/getf/getdata?sort=upload_date&order=desc&limit=6"
        );
        setData(response.data.data);
        console.log(data)
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
    <div className="flex flex-col items-center h-screen relative">
      <div className="flex justify-center items-center w-full h-full">
        <div
          className="border border-gray-300 overflow-hidden flip-card sm:w-96 md:w-3/4 lg:w-4/5 xl:w-4/5"
          style={{ height: "60vh" }}
        >
          {data.length > 0 && (
            <>
              {currentPage < 5 && (
                <motion.img
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0 }}
                  src={data[currentPage].url}
                  alt=""
                  className="w-full h-full object-cover img-fluid"
                />
              )}
              {currentPage === 5 && (
                <video
                  controls
                  className="w-full h-full"
                  src={data[currentPage].url}
                  type="video/mp4"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none mr-4"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === data.length - 1}
          className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ShowData;
