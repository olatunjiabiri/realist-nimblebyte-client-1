import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { config } from "../NewConfig";
import config from "./../NewConfig";
import ContentWrapper from "../components/contentWrapper/ContentWrapper";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import "./Login.css";

export default function Login() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => {
    setVisible(!visible);
  };

  const fetchUserWishlists = async (user) => {
    const { userId } = user;
    // console.log("userId", userId);
    try {
      const { data } = await axios.get(`/wishlist/${userId}`);

      // console.log("data=>", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleFaceBookSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${config.AUTH_API}/user/facebook-signIn`,
      );
      if (data?.success) {
        window.location.replace(data.responsePayload);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong", err);
    }
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${config.AUTH_API}/user/google-signIn`);
      window.location.replace(data);
    } catch (err) {
      toast.error("Something went wrong", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${config.AUTH_API}/user/SignIn`, {
        email,
        password,
        phoneNumber: "",
      });

      if (!data?.success) {
        setLoading(false);
        if (data?.statusCode === 417) {
          navigate("/confirmation");
        }
      } else {
        const { token, user } = data.responsePayload;
        const wishlistData = await fetchUserWishlists(user);
        const { wishlist } = wishlistData;
        const userWishlist = wishlist[0]?.wishlist;
        setAuth({ token, user, wishlist: userWishlist });

        localStorage.setItem(
          "auth",
          JSON.stringify({ token, user, wishlist: userWishlist }),
        );
        localStorage.removeItem("confirmation");
        toast.success("Login successful");
        setLoading(false);

        if (auth.user?.firstName === "") navigate("/user/profile");

        location?.state !== null ? navigate(location.state) : navigate("/");
      }
    } catch (err) {
      if (err.response.data.success === false) {
        switch (err.response.data.statusCode) {
          case 302: //user does not exist
            toast.error(err.response.data.message);
            navigate("/register");
            break;
          case 401:
            toast.error("Invalid Credential."); // Incorrect password
            break;
          case 417:
            toast.error("Email not confirmed."); // Incorrect password
            localStorage.setItem(
              "confirmation",
              JSON.stringify({
                email,
              }),
            );
            navigate("/confirmation");
            // toast.error(err.response.data.message); //wrong password
            break;
          default:
          // code block
        }
        // toast.error(err.response.data.message);
      } else toast.error("Something went wrong", err);
      setLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form onSubmit={handleSubmit}>
            {location?.state?.fromAction === "like" ? (
              <div className="h3 mb-4 text-center">
                {" "}
                Login or Create an Account to like an Ad
              </div>
            ) : (
              <div className="h3 mb-4 text-center"> Log In</div>
            )}
            <input
              type="text"
              placeholder="Enter your email"
              className="form-control mb-4"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="Enter your password"
                className="form-control mb-4"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="password-toggle" onClick={toggle}>
                {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>

            <button disabled={loading} className="btn btn-primary col-12 mb-4">
              {loading ? "Waiting..." : "Login"}
            </button>

            <button
              onClick={handleFaceBookSubmit}
              disabled={loading}
              className="btn btn-outline-primary col-12 mb-4"
            >
              {"Sign In with Facebook"}
            </button>
            <button
              onClick={handleGoogleSubmit}
              disabled={loading}
              className="btn btn-outline-danger col-12 mb-4"
            >
              <span>{"Sign In with Google"}</span>
            </button>
          </form>

          <div className="d-flex justify-content-between">
            <Link className="text-primary" to="/register">
              Register
            </Link>
            <Link className="text-danger" to="/auth/forgot-password">
              Forgot password
            </Link>
          </div>
        </div>
      </div>

      {/* <pre>{JSON.stringify(auth, null, 4)} </pre> */}
    </ContentWrapper>
  );
}
