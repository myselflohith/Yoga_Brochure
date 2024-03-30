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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/getf/getdata?sort=upload_date&order=desc&limit=1"
        ); // Assuming your API supports sorting and limit query params
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
    <div className="flex flex-col items-center h-screen relative">
      <div className="flex justify-center items-center w-full h-full">
        <div
          className="border border-gray-300 overflow-hidden flip-card"
          style={{ width: "800px", height: "450px" }}
        >
          {data.length > 0 && (
            <motion.img
              key={currentPage}
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={data[currentPage].url}
              alt=""
              className="w-full h-full object-cover"
            />
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
