import React, { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signInUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Attempt", { email, password });
    setEmail("");
    setPassword("");

    signInUser(email, password)
      .then((result) => {
        console.log("User logged in:", result.user.email);
        const user = { email: result.user.email };
        navigate(from, { replace: true });
        toast.success("Successfully Loggedin!", {
          position: "top-center", // Position at the top-center of the screen
          theme: "colored",
          style: { backgroundColor: "#d2f34c", color: "#244034" }, // Custom color (green background with white text)
        });
        axios
          .post("http://localhost:5000/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error logging in:", errorCode, errorMessage);
        // Handle login error (e.g., show an error message)

        toast.error("Login failed. Please try again.", {
          theme: "colored",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary p-4">
      <div className="card w-11/12 lg:w-1/3 bg-white p-6 rounded-xl">
        <h2 className="text-4xl font-semibold text-primary text-center mb-4">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
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
                placeholder="Enter your password"
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
            Login
          </button>
        </form>

        <div className="divider my-4"> </div>

        <SocialLogin />
        <div className="divider my-4"></div>

        <p className="text-center text-sm text-primary mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-primary font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
