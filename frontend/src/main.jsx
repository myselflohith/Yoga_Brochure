import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import "./index.css";
import Admin from "./pages/admin";
import ShowData from "./test/ShowData";

// Corrected the component name to start with uppercase
export const Wrapper = ({ children }) => {
  const data = localStorage.getItem("userData");
  if (data) {
    return children;
  } else {
    return <Login />;
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Changed the wrapper component to uppercase */}
        <Route path="/admin" element={<Wrapper><Admin /></Wrapper>} />
        <Route path="/" element={<ShowData />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);




// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import App from "./App";
// import Login from "./pages/login";
// import SignUp from "./pages/signup";
// import "./index.css";
// import Admin from "./pages/admin";
// import ShowData from "./test/ShowData";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="/" element={<App />} /> */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/admin" element={<wrapper><Admin /></wrapper>} />
//         <Route path="/" element={<ShowData />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// export const wrapper = ({ child }) => {
//   const data = localStorage.getItem("userData");
//   if (data) {
//     return child;
//   }
//   else {
//     return <Login/>
//   }
// }
