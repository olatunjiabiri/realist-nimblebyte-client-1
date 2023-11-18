import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutMessage = ({ children }) => {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const [token, setToken] = useState(auth?.token);
  useEffect(() => {
    // Check token expiration when the component mounts
    checkTokenExpiration();

    // Optionally, you can set up a timer to periodically check the token expiration
    // For simplicity, this example checks the token expiration every 5 seconds
    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const checkTokenExpiration = () => {
    const storedToken = token;

    if (storedToken) {
      // Decode the token (assuming it's a JWT)
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      //   console.log("decodedToken>>>", decodedToken);

      // Check the expiration time
      const currentTime = Math.floor(Date.now() / 1000);
      //   console.log("currentTime>>>", currentTime);

      if (decodedToken.exp && currentTime > decodedToken.exp) {
        // Token has expired
        toast.success(" Your session has expired. Please log in again.");
        setToken(null);
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
        navigate("/login", {
          state: `/`,
        });
      }
    }
  };

  return (
    <div>
      {/* Conditionally render the main content or the logout message based on the token */}
      {!token && (
        <div>
          {/* toast.error(" Your session has expired. Please log in again."); */}
        </div>
      )}
      {children}
    </div>
  );
};
export default LogoutMessage;
