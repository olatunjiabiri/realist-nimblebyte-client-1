import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/auth";

import "./Paystack.css";
import PaystackPop from "@paystack/inline-js";

const Paystack = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();
  const data = location.state;

  const PayWithPayStack = async (e) => {
    e.preventDefault();

    // Create a payment request object
    const paymentRequest = {
      adId: data.adID,
      amount: amount * 100, // Convert amount to kobo (Paystack's currency)
    };

    try {
      // Make a POST request to your backend to initiate payment
      const response = await fetch(
        "https://localhost:7067/api/payments/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentRequest),
        }
      );

      if (response.ok) {
        // Payment initiation was successful
        const data = await response.json();
        const { paymentUrl } = data;

        console.log("paymentUrl>>", paymentUrl);

        // Redirect the user to the payment gateway URL
        window.location.href = paymentUrl;
      } else {
        // Handle error response from the backend
        console.error("Payment initiation failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <>
      <div className="my-header text-center">
        <h5>Paystack in Realist App</h5>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-4 mx-auto my-form text-center">
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  id="amount"
                  name="amount"
                  placeholder="Enter Amount (in Naira)"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" onClick={PayWithPayStack}>
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paystack;
