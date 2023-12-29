import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";
import { AiFillWarning } from "react-icons/ai";
import ProfileForm from "../../components/forms/profileForm/ProfileForm";
import LogoutMessage from "../../components/misc/logoutMessage/LogoutMessage";

export default function BeAgent() {
  const [pathURL, setPathURL] = useState();
  useEffect(() => {
    const path = window.location.pathname.split("/");
    setPathURL(path[2]);
  }, []);

  // console.log("pathurl", pathURL);

  return (
    <LogoutMessage>
      <ProfileForm sourceURL={pathURL} />
      {/* <pre>{JSON.stringify(pathURL, null, 4)} </pre> */}
    </LogoutMessage>
  );
}
