import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const url = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Google Auth Function (Replace with real OAuth)
  // Maybe in your `handleGoogleLogin`
  // Add this inside your component
  const fetchGoogleData = async () => {
    try {
      const response = await fetch('https://api.freeapi.app/api/v1/users/google', {
        method: 'GET'
      });
      const data = await response.json();

    } catch (error) {
      console.error("Google Fetch Error:", error);
    }
  };

  const handleGoogleLogin = () => {
    fetchGoogleData();
    toast.info("Attempting Google login...");
  };


  // Formik Validation Schema
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: true,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Za-z]/, "Password must contain at least one letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      acceptTerms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${url}/register`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            acceptTerms: values.acceptTerms,
          }),
        });

        const data = await response.json();
        if (data.message) {
          toast.success("Account Created Successfully!");
          formik.resetForm();
          setTimeout(() => navigate("/login"), 1000);
        } else {
          toast.error(`Registration Failed: ${data.message}`);
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("An error occurred during registration.");
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <>
      <section className="back lg:py-35">
        <div className="w-full max-w-5xl mx-auto bg-white overflow-hidden md:flex">
          {/* Left Section */}
          <div className="md:w-1/2 flex flex-col">
          <img src="/img/register.png" className="w-full h-full" alt="" />
          </div>
          {/* Right Section */}
          <div className="md:w-1/2 px-8 flex flex-col pt-10">
            <h3 className="font-semibold text-[24px]">Create Account</h3>
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{" "}
              <Link to={"/login"} className="text-[#AA8265] font-semibold">
                Log in here
              </Link>
            </p>

            {/* Google Register Button */}
            {/* <button
              onClick={handleGoogleLogin}
              className="mt-8 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded text-[#AA8265]"
            >
              <img src="icon/Google.png" alt="Google" className="w-5 h-5 mr-2" /> Register with Google
            </button>

            <p className="mt-5 text-center text-sm text-[#AA8265]">
              or register with Email
            </p> */}

            {/* Registration Form */}
            <form className="mt-6" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                className="w-full mt-4 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-300"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
              )}

              <input
                type="text"
                placeholder="Last Name"
                className="w-full mt-4 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-300"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
              )}

              {/* Username Input */}
              {/* <input
                type="text"
                placeholder="Username"
                className="w-full mt-4 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-300"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
              )} */}
              {/* Email Input */}
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 mt-4 py-2 border rounded border-gray-300 focus:ring-2 focus:ring-brown-300"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full mt-4 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-300 pr-10"
                  {...formik.getFieldProps("password")}
                />
                <span
                  className="mt-4 absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-600 text-2xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}


              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full mt-4 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-brown-300 pr-10"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <span
                  className="mt-4 absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-600 text-2xl"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>


              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
              )}


              {/* Remember Me & Forgot Password */}
              {/* <div className="flex items-center justify-between mt-8">
                <label className="flex items-center font-medium text-sm text-[#5B3E38]">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...formik.getFieldProps("rememberMe")}
                  />{" "}
                  Remember me
                </label>
                <Link to={"/"} className="text-sm text-[#AA8265] font-semibold">
                  Forgot password?
                </Link>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-8 w-full ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#AA8265] cursor-pointer'
                  } text-white py-2 font-semibold rounded`}
              >
                {isSubmitting ? 'Registering...' : 'REGISTER'}
              </button>

            </form>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />


    </>
  );
};

export default Register;
