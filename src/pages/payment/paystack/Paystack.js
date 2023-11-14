import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../../../NewConfig";
import "./Paystack.css";
import axios from "axios";

const Paystack = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const param = location.state;

  const PayWithPayStack = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${config.PAYMENT_API}/api/payments/initialize`,
        {
          adId: param.adID,
          amount: amount * 100,
        },
      );
      if (data.success) {
        window.location.replace(data.responsePayload.authorizationUrl);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <>
      <div className="my-header text-center">
        <h5>Paystack in NimbleCasa</h5>
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
                <button
                  type="submit"
                  onClick={PayWithPayStack}
                  className={` ${loading ? "disabled" : ""}`}
                >
                  {loading ? "Submitting..." : "Pay Now"}
                </button>

                {/* <button type="submit" onClick={PayWithPayStack}>
                  Pay Now
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paystack;
