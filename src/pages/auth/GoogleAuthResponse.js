import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../config.js";
import { useAuth } from "../../context/auth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function GoogleAuthResponse() {
  // hooks
  const [searchParams] = useSearchParams();
  const [auth, setAuth] = useAuth();
  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  const code = searchParams.get("code");

  useEffect(() => {
    if (code) loginUserOnResponse();
  }, [code]);

  const fetchUserWishlists = async (user) => {
    const { userId } = user;
    try {
      const { data } = await axios.get(`/wishlist/${userId}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const loginUserOnResponse = async () => {
    try {
      const { data } = await axios.get(
        `${config.AUTH_API}/user/google-callback?code=${code}`
      );
      if (data?.success) {
        const { token, user } = data.responsePayload;
        const wishlistData = await fetchUserWishlists(user);
        const { wishlist } = wishlistData;
        const userWishlist = wishlist[0]?.wishlist;
        setAuth({ token, user, wishlist: userWishlist });

        localStorage.setItem(
          "auth",
          JSON.stringify({ token, user, wishlist: userWishlist })
        );
        toast.success("Login successful");
        setLoading(false);

        if (auth.user?.firstName === "") navigate("/user/profile");

        location?.state !== null ? navigate(location.state) : navigate("/");
      } else {
        toast.error("Something went wrong");
        navigate("/login");
      }
    } catch (err) {
      toast.error("Something went wrong, please try again", err);
      navigate("/login");
    }
  };

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please wait...
    </div>
  );
}
