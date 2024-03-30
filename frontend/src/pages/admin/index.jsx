import React from "react";
import { useNavigate } from "react-router-dom";
import Test1 from "@/test/Test1";

const Admin = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("userData")
    nav("/login");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-4">Admin Page</h1>
      <button className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded" onClick={handleLogout}>
        Logout
      </button>
      <div className="mt-8">
        <Test1 />
      </div>
    </div>
  );
};

export default Admin;


// import Test1 from "@/test/Test1";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Admin = ({ userData, onLogout }) => {
//   const nav = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("userData");
//     onLogout();
//     nav("/login");
//   };
//   return (
//     <div className="text-center">
//       <h1>This is Admin page</h1>
//       <button className="text-white underline" onClick={handleLogout}>
//         Logout
//       </button>
//       <Test1 />
//     </div>
//   );
// };

// export default Admin;
