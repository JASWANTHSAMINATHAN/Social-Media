import React, { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PiWarningOctagonBold } from "react-icons/pi";
import { MdCardTravel } from "react-icons/md";

const SignIn = ({onLogin}) => {
  const [showIcon, setShowIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      await axios.post(`http://localhost:3000/auth/login`, data);

      const userData = {
        isLogin: true,
        email: formData.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      onLogin(true);
      navigate("/");
    } catch (error) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="signin-signup-container">
      <div className="child-container">
        <MdCardTravel className="t-icon" />
        <h1>Welcome Back</h1>
        <p>
          <p>Welcome to our WanderWorld!</p>
        </p>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="form_error-message">
              {error} <PiWarningOctagonBold style={{ fontSize: "1rem" }} />
            </p>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email id"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              type={showIcon ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              required
              onChange={handleChange}
            />
            <div
              className="show-icon"
              onClick={() => setShowIcon((previous) => !previous)}
            >
              {showIcon ? (
                <FaRegEye className="icon" />
              ) : (
                <FaRegEyeSlash className="icon" />
              )}
            </div>
          </div>
          <button type="submit" className={loading ? "loading" : "btn"}>
            {loading ? <div className="loader"></div> : "Sign In"}
          </button>
        </form>

        <p>
          You don't have an account yet?{" "}
          <Link to="/signup" className="link">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
