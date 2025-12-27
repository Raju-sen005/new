import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token"); // Assuming FreeAPI sends back a token

    if (token) {
      // Save token to localStorage or context
      localStorage.setItem("authToken", token);
      navigate("/dashboard"); // or wherever you want
    } else {
      console.error("Google login failed or no token returned");
      navigate("/register");
    }
  }, [location, navigate]);

  return <p>Logging you in...</p>;
};

export default GoogleCallback;
