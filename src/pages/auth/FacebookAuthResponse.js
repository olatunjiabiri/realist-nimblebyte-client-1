
import React, { useEffect, useState } from "react";

export default function FacebookAuthResponse(){

    useEffect(() => {
        loginUserOnResponse();
      })
    
    
    const loginUserOnResponse = async (e) => {
        e.preventDefault();
        console.log("Login")
      }
}

