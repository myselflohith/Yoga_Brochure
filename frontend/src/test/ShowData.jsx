// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const ShowData = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/getf/getdata"
//         );
//         setData(response.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const nextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, data.length - 1));
//   };

//   const prevPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button onClick={prevPage} disabled={currentPage === 0}>
//         Previous
//       </button>
//       <div className="flip-container">
//         {data.length > 0 && (
//           <motion.div
//             key={currentPage}
//             initial={{ opacity: 0, rotateY: 180 }}
//             animate={{ opacity: 1, rotateY: 0 }}
//             transition={{ duration: 0.5, ease: "easeInOut" }} // Adding smooth transition with easeInOut
//             className="w-full max-w-screen-lg h-80 border border-gray-300 overflow-hidden flip-card"
//             style={{
//               backgroundImage: `url(${data[currentPage].url})`,
//               backgroundSize: "contain",
//               backgroundPosition: "center",
//               width: "800px",
//               borderRadius: "10px",
//               backgroundRepeat:"no-repeat"
//             }}
//           />
//         )}
//       </div>
//       <button onClick={nextPage} disabled={currentPage === data.length - 1}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default ShowData;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ShowData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/getf/getdata`
        );


        // Sort records by upload date in descending order
        const sortedData = response.data.data.sort(
          (a, b) => new Date(b.upload_date) - new Date(a.upload_date)
        );

        // Find the latest upload date
        const latestDate = sortedData[0].upload_date;
        console.log(latestDate);

        const latestRecords = sortedData.filter(
          (item) => item.upload_date.split("T")[0] === latestDate.split("T")[0]
        );

        console.log("latest data",latestRecords);
        setData(latestRecords);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / recordsPerPage) - 1)
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const paginatedData = data.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  console.log("paginatedData", paginatedData);

  return (
    <div className="container-fluid flex flex-col items-center justify-center h-screen relative">
      <div className="flip-container mb-4 relative">
        {paginatedData.length > 0 && (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full shadow-lg max-w-screen-lg h-80 border border-gray-300 overflow-hidden flip-card relative"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "500px",
              height: "400px",
              borderRadius: "10px",
            }}
          >
            {paginatedData.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "image" && (
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
                {item.type === "video" && (
                  <video
                    autoPlay
                    controls
                    className="w-full h-full object-cover"
                  >
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </div>
      <div className="button-container">
        <button
          className="btn btn-primary ms-3"
          data-tooltip="Previous"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          <FaArrowLeft />
        </button>
        <button
          className="btn btn-primary ms-3"
          data-tooltip="Next"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(data.length / recordsPerPage) - 1}
        >
          <FaArrowRight />
        </button>
      </div>

      <p className="mt-4 text-center">
        {paginatedData.length > 0 &&
          `Page ${currentPage + 1} of ${Math.ceil(
            data.length / recordsPerPage
          )}`}
      </p>
      {currentPage === Math.ceil(data.length / recordsPerPage) - 1 && (
        <p className="mt-4 text-center">You have finished viewing all pages.</p>
      )}
    </div>
  );
};

export default ShowData;

// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const ShowData = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/getf/getdata"
//         );
//         setData(response.data.data);
//         console.log(data)
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const nextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, data.length - 1));
//   };

//   const prevPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button onClick={prevPage} disabled={currentPage === 0}>
//         Previous
//       </button>
//       <div className="flip-container">
//         {data.length > 0 && (
//           <motion.div
//             key={currentPage}
//             initial={{ opacity: 0, rotateY: 180 }}
//             animate={{ opacity: 1, rotateY: 0 }}
//             transition={{ duration: 0.5, ease: "easeInOut" }} // Adding smooth transition with easeInOut
//             className="w-full max-w-screen-lg h-80 border border-gray-300 overflow-hidden flip-card"
//             style={{
//               backgroundImage: `url(${data[currentPage].url})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               width: "500px",
//               borderRadius: "10px",
//             }}
//           />
//         )}
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 0}
//           className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none mr-4"
//         >
//           <FaArrowLeft />
//         </button>
//         <button
//           onClick={nextPage}
//           disabled={currentPage === data.length - 1}
//           className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none"
//         >
//           <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShowData;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import left and right arrow icons from react-icons

// const ShowData = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/getf/getdata"
//         );
//         setData(response.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const nextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, data.length - 1));
//   };

//   const prevPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
//   };

//   return (
//     <div className="flex flex-col items-center h-screen relative">
//       <div className="flex justify-center items-center w-full h-full">
//         <div
//           className="border border-gray-300 overflow-hidden flip-card"
//           style={{ width: "800px", height: "450px" }}
//         >
//           {data.length > 0 && (
//             <motion.img
//               key={currentPage}
//               initial={{ opacity: 0, rotateY: 180 }}
//               animate={{ opacity: 1, rotateY: 0 }}
//               transition={{ duration: 0.5, ease: "easeInOut" }} // Adding smooth transition with easeInOut
//               src={data[currentPage].url}
//               alt=""
//               className="w-full h-full object-cover"
//             />
//           )}
//         </div>
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 0}
//           className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none mr-4"
//         >
//           <FaArrowLeft />
//         </button>
//         <button
//           onClick={nextPage}
//           disabled={currentPage === data.length - 1}
//           className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none"
//         >
//           <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShowData;
