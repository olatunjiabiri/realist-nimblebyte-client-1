import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import config from "../../../../config.js";
import "./paystackVerifyPayment.css";

const PaystackVerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get("reference");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (reference) verifyPayment();
  }, [reference]);

  const verifyPayment = async () => {
    try {
      const { data } = await axios.post(
        `${config.PAYMENT_API}/api/payments/verify`,
        {
          reference: reference,
        }
      );

      if (data.success) {
        setIsVerified(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    navigate("/dashboard");
  };

  return (
    <div className="display-1 d-flex justify-content-center align-items-center vh-100">
      {!isVerified ? (
        <span> Please wait...verifying payment </span>
      ) : (
        <div className="verify-text">
          {" "}
          Payment Successful
          <button
            onClick={handleClick}
            className="btn btn-primary verify-button"
          >
            Click here
          </button>{" "}
          to return to dashboard
        </div>
      )}
    </div>
  );
};

export default PaystackVerifyPayment;
