import React, { useEffect, useState } from "react";

import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

import config from "../../NewConfig";

import "./index.css";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // console.log("publishableKey", STRIPE_PUBLISHABLE_KEY);
    setStripePromise(loadStripe(config.STRIPE_PUBLISHABLE_KEY));
  }, []);

  useEffect(() => {
    clientSecretCall();
  }, []);

  const clientSecretCall = async () => {
    try {
      const response = await axios.post(
        `https://payorigins-payment.azurewebsites.net/api/StripePaymentIntent/initiate`,
        {
          amount: 2000,
        }
      );

      if (!response?.data?.success) {
        // toast.error(response?.data?.message);
        // navigate("/login");
      } else {
        const { responsePayload } = response.data;
        setClientSecret(responsePayload.clientSecret);
      }
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="container m-5 p-5">
        <div className="container mt-5 pt-5" style={{ marginTop: "80px" }}>
          <div className="row">
            {/* <div className="col-lg-4 offset-lg-4"> */}
            <h1> Stripe Payment </h1>
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
            {/* </div>{" "} */}
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default Payment;
