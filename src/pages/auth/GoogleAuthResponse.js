import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../NewConfig";
import { useAuth } from "../../context/auth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function GoogleAuthResponse(){

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
    if(code) loginUserOnResponse();
 }, [code])
 
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
    try{
        console.log(code)
    }
    catch(err){

    }
 }

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please wait...
    </div>
  );

}