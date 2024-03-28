import { useNavigate } from "react-router-dom";
import Button from "./components/button";

import Test1 from "./test/Test1";
function App() {
  const navigate = useNavigate();

  return (
    <div className="p-5 h-screen w-screen flex flex-col">
      <div className="text-3xl">Welcome to YOGA_BROCHURE</div>
      <div className="grid place-content-center flex-1">
        <Button label="Login" onClick={() => navigate("/login")} />
        <div className="grid place-content-center flex-1">
          <Test1 />
        </div>

        <Button label="show data" onClick={() => navigate("/showdata")} />
      </div>
    </div>
  );
}

export default App;
