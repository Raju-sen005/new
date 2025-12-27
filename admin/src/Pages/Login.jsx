import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const baseURL = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate(); // for redirection after successful login
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@123');

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent default form submission
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${baseURL}/authenticate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful. Returned data:', data);

      // You might want to store the token or user data here (e.g., in localStorage)
      localStorage.setItem('user', JSON.stringify(data));

      // Redirect to protected page (e.g., order list or dashboard)
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Left Section */}
        <div className="p-10">
          <div className="flex items-center space-x-2 mb-8">
            <img src="icons/man-logo.png" alt="Logo" width={150} />
          </div>
          <div>
            <h2 className="lg:text-[40px] text-[30px] font-bold mb-4">
              Log In and Explore
            </h2>
            <p className="text-gray-400 mb-6 lg:text-[16px] text-[14px]">
              Welcome back to ShopSwift! We're thrilled to have you return.
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border border-[#383838] mt-2 w-full px-4 py-2 border-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="border border-[#383838] mt-2 w-full px-4 py-2 border-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="mb-4 text-red-500">
                {error}
              </div>
            )}
            <div className="mb-6">
              <button
                type="submit"
                className="bg-[#5C6CF2] w-full text-white font-semibold rounded py-2 cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Continue with Email'}
              </button>
            </div>
          </form>
          {/* <div className="text-center text-black font-medium my-4">Or</div> */}
          {/* <div className="flex mb-5 space-x-4">
            <button className="cursor-pointer border py-2 rounded flex items-center justify-center">
              <a href="#">
                <img src="icons/Google.png" className="w-5 h-5" alt="Google" />
              </a>
            </button>
            <button className="cursor-pointer border py-2 rounded flex items-center justify-center">
              <a href="#">
                <img src="img/Facebook-2.png" className="w-5 h-5" alt="Facebook" />
              </a>
            </button>
            <button className="cursor-pointer border py-2 rounded flex items-center justify-center">
              <a href="#">
                <img src="icons/apple1.png" className="w-5 h-5" alt="Apple" />
              </a>
            </button>
          </div> */}
          {/* <div>
            <p className="text-sm">
              New to our platform?{' '}
              <a href="#" className="text-blue-500 font-medium">
                Sign Up Here
              </a>
            </p>
            <p className="text-sm mt-6">
              By proceeding, you agree to our{' '}
              <a href="#" className="text-blue-500 font-medium">
                Terms of Service
              </a>
              .
            </p>
          </div> */}
        </div>
        {/* Right Section */}
        <div className="right">
          <img
            src="img/login.png"
            alt="ShopSwift Store"
            className="w-full lg:h-full md:h-full rounded-3xl lg:p-2 py-2 px-10 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
