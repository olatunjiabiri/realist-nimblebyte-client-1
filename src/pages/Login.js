import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://payorigins-auth.azurewebsites.net/user/SignIn`,
        {
          email,
          password,
        }
      );

      if (!data?.success) {
        // toast.error(data.message);
        toast.error("Account does not exist, Please register");

        setLoading(false);
      } else {
        const { token, user } = data.responsePayload;

        const wishlistData = await fetchUserWishlists(user);
        const { wishlist } = wishlistData;
        const userWishlist = wishlist[0]?.wishlist;

        // console.log("wishlistData =>", userWishlist);
        setAuth({ token, user, wishlist: userWishlist });

        localStorage.setItem(
          "auth",
          JSON.stringify({ token, user, wishlist: userWishlist })
        );
        toast.success("Login successful");
        // showToastMessage();
        setLoading(false);

        if (auth.user?.firstName === "") navigate("/user/profile");

        location?.state !== null
          ? navigate(location.state)
          : navigate("/dashboard");
      }
    } catch (err) {
      if (err.response.data.success === false) {
        toast.error(err.response.data.message);
      } else toast.error("Something went wrong", err);
      setLoading(false);
    }
  };

  return (
    <div className="container m-5 p-5">
      <div className="container mt-5 pt-5" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control mb-4"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting..." : "Login"}
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
      </div>
      {/* <pre>{JSON.stringify(auth, null, 4)} </pre> */}
    </div>
  );
}
