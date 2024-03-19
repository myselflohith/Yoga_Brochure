import people from '@/assets/people.png';
import Button from '@/components/button';
import Input from '@/components/input';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/get/login",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-2 min-h-screen w-screen">
      <div className="grid place-content-center">
        <img
          src={people}
          alt="people"
          className="w-[90%] mx-auto"
        />
      </div>
      <div className='bg-blue p-10 pt-[15%]'>
        <div className='text-5xl text-white text-center mb-5'>Welcome Back!</div>
        <form onSubmit={onSubmit}>
          <div className='space-y-6 mx-auto w-[80%]'>

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
              <Button
                label="Login"
                type="submit"
              />
            </div>
            <div className='text-white text-xl'>
              <div>Don't have account? <Link className="underline" to="/signup">Signup</Link></div>
              <Link className="underline" to="/signup">Forgot Password</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login