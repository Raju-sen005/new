import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const url = import.meta.env.VITE_BACKEND_URL
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(`${url}/authenticate`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password
          })
        });

        const data = await response.json();
        

        if (data.jwtToken) {
          const { jwtToken, ...userData } = data;

          Cookies.set("accessToken", jwtToken, { expires: 7, sameSite: "Strict" });
          Cookies.set("user", JSON.stringify(userData), { expires: 7, sameSite: "Strict" });

          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error(data.message || "Login failed.");
        }

      } catch (error) {
        console.error("Login Error:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }

  });

  const handleForgotPassword = async () => {
    const email = formik.values.email;

    if (!email) {
      toast.error("Please enter your email in the email field.");
      return;
    }

    try {
      const res = await fetch("https://api.freeapi.app/api/v1/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <section className="back lg:py-35">
        <div className="w-full max-w-5xl mx-auto bg-white overflow-hidden md:flex">
          {/* Left Section */}
           <div className="md:w-1/2 flex flex-col">
          <img src="/img/log-in.png" className="w-full h-full" alt="" />
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h3 className="font-semibold text-[24px]">Log in</h3>
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account yet?{" "}
              <Link to={"/register"} className="text-[#AA8265] font-semibold">
                Sign up here
              </Link>
            </p>

            <form className="mt-8" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full px-4 py-2 border rounded border-gray-300 focus:ring-2 focus:ring-brown-300"
                required
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}

              <div className="relative mt-4">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-300 pr-10"
                  required
                />
                <span
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="flex items-center justify-between mt-8">
                <label className="flex items-center font-medium text-sm text-[#5B3E38]">
                  <input type="checkbox" className="mr-2 text-[#AA8265]" /> Remember me
                </label>
                <span
                  onClick={handleForgotPassword}
                  className="text-sm text-[#AA8265] cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                className="mt-8 w-full bg-[#AA8265] text-white py-2 font-semibold rounded cursor-pointer"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Login;
