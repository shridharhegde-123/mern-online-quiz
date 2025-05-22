import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  const navigate = useNavigate();

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios
        .post("http://localhost:4000/register", user)
        .then(() => {
          toast("Successfully Registered", { type: "success" });
          setTimeout(() => navigate("/login"), 3000);
        })
        .catch(() => {
          toast("Invalid Input", { type: "error" });
        });
    } else {
      toast("Invalid Input", { type: "error" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-around items-center m-auto mt-10 px-4">
      <div className="register w-full md:w-1/2 max-w-md">
        <p className="text-2xl font-semibold mb-4">Register</p>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="Your Email"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Your Password"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="reEnterPassword"
          value={user.reEnterPassword}
          placeholder="Re-enter Password"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded-md text-xl mb-4"
          onClick={register}
        >
          Register
        </button>
        <ToastContainer />
        <div className="text-center mb-4">OR</div>
        <Link to="/login">
          <button className="w-full p-2 bg-green-500 text-white rounded-md text-xl">
            Login
          </button>
        </Link>
      </div>
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img className="h-64 md:h-96 w-64 md:w-96" src="./register.gif" alt="register gif" />
      </div>
    </div>
  );
};
