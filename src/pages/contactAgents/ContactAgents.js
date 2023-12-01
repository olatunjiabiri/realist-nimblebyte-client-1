import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactAgents.css";

const ContactAgents = () => {

  return (
    <div className="container-fluid my-5 p-5 h-100">
        <div className="row h-100">
          <div className="col-lg-6 d-flex">
            <div className="p-4 pt-5">
              <h4 className="tittle">
                Contact an Agent to Sell or Lease your Property
              </h4>
              <h2 className="second-tittle">Property Owner?</h2>
              <div className="contact-word">
                <p>
                  Do you own a property and wish to sell or lease it without
                  relying on an agent you may not trust?
                </p>
                <p>
                  Our certified agent/relationship manager is ready to handle
                  the sale or lease of your property on your behalf.
                </p>
                <p>
                  Sit back and await your money while we manage the process for
                  you.
                </p>
                <p>
                  If this sounds like you, Kindly reach out to us{" "}
                  <a href="*">here</a>.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="p-4 pt-5 text-justify">
              <img
                src="https://via.placeholder.com/300"
                alt="Placeholder"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContactAgents;
