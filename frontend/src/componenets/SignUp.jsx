import React, { useEffect, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PiWarningOctagonBold } from "react-icons/pi";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { MdCardTravel } from "react-icons/md";

const SignUp = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      setError("Password mismatch. Please check your password.");
      setLoading(false);
      return;
    }
  
    try {
      await axios.post(`http://localhost:3000/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Registered Successfully");
      navigate("/signin");
    } catch (error) {
      toast.error("This account is already registered");
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
        <h1>Create an Account</h1>
        <p>
          <p>
            Join our community of WanderWorld!
          </p>
        </p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {error && (
            <p className="form_error-message">
              {error} <PiWarningOctagonBold style={{ fontSize: "1rem" }} />
            </p>
          )}
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email id"
            onChange={handleChange}
            required
          />
          <div className="passwords-container">
            <div>
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
              </div>
            </div>
            <div>
              <label htmlFor="password">Confirm</label>
              <div className="password-field">
                <input
                  type={showIcon ? "text" : "password"}
                  placeholder="Enter your password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
            </div>
          </div>
          <button type="submit" className={loading ? "loading" : "btn"}>
            {loading ? <div className="loader"></div> : "Sign Up"}
          </button>
        </form>
        <p>
          You have an account?{" "}
          <Link to="/signin" className="link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
