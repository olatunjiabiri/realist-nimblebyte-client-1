import React,{ useEffect, useState } from "react";

import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

import { STRIPE_PUBLISHABLE_KEY } from "../../../src/config";

import "./index.css";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // console.log("publishableKey", STRIPE_PUBLISHABLE_KEY);
    setStripePromise(loadStripe(STRIPE_PUBLISHABLE_KEY));
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
      <div className="container">
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
    </>
  );
}

export default Payment;
