import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import config from "../../../../NewConfig";

const PaystackVerifyPayment = () => {

    const [searchParams] = useSearchParams();

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

        console.log(data)
        if (data.success) {
            setIsVerified(true)
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    return (
      <div className="display-1 d-flex justify-content-center align-items-center vh-100">
        {!isVerified ? (
          <span> Please wait...verifying payment </span>
        ) : (
          <div className="verify-success-text"> Payment Successful, click button to return to dashboard </div>
        )}
      </div>
    );
};

export default PaystackVerifyPayment;

