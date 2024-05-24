import person from "@/assets/person.png";
import Button from "@/components/button";
import Input from "@/components/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const nav = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/insert/register`,
        formData
      );

      console.log("Response:", response);
      if (response.data.success) {
        nav("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-2 min-h-screen w-screen">
      <div className="grid place-content-center">
        <img src={person} alt="person" className="w-[90%] mx-auto" />
      </div>
      <div className="bg-blue p-10 pt-[15%]">
        <div className="text-5xl text-white text-center mb-5">
          Welcome Back!
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-6 mx-auto w-[80%]">
            <Input
              name="name"
              label="Name"
              type="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="pt-4">
              <Button label="Signup" type="submit" />
            </div>
            <div className="text-white text-xl">
              <div>
                Already signed up?{" "}
                <Link className="underline" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
