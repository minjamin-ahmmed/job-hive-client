import React, { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { createUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data", {
      name,
      photo,
      phone,
      email,
      password,
    });
    setName("");
    setPhoto("");
    setPhone("");
    setEmail("");
    setPassword("");

    createUser(email, password, name, photo)
      .then((user) => {
        console.log("User registered & profile updated:", user);

        toast.success("Registration successful!", {
          position: "top-center", // Position at the top-center of the screen
          theme: "dark",
          style: { backgroundColor: "#d2f34c", color: "#244034" }, // Custom color (green background with white text)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering user:", errorCode, errorMessage);

        toast.error("Registration failed. Please try again.", {
          position: "top-center", // Position at the top-center of the screen
          theme: "dark",
          style: { backgroundColor: "#FF5733", color: "#fff" }, // Custom color (red background with white text)
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary p-4">
      <div className="card w-11/12 lg:w-1/3 bg-white p-6 rounded-xl">
        <h2 className="text-4xl font-semibold text-primary text-center mb-4">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-primary-500 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full focus:border-secondary focus:ring-secondary"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-primary-500 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full focus:border-secondary focus:ring-secondary"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            <label className="block text-primary-500 font-medium mb-2">
              Photo URL
            </label>
            <input
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="input input-bordered w-full focus:border-secondary focus:ring-secondary"
              placeholder="Link to your profile picture"
            />
          </div>
          <div>
            <label className="block text-primary-500 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full focus:border-secondary focus:ring-secondary"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-primary-500 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full focus:border-secondary focus:ring-secondary pr-10"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-primary-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="btn bg-primary hover:bg-primary text-white w-full"
          >
            Register
          </button>
        </form>

        <div className="divider my-4"> </div>

        <SocialLogin />
        <div className="divider my-4"></div>
        <p className="text-center text-sm text-primary mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
