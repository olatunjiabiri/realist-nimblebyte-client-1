import React from "react";
import { Link } from "react-router-dom";
import "./ContactAgents.css";

const ContactAgents = () => {
  return (
    <div className="container my-5 p-5">
      <div className="row">
        <div className="col-lg-6 word">
          <div className="p-4 pt-5">
            <h4 className="title">
              <span className="bold-text">
                Contact Us to Sell or Lease your Property
              </span>
            </h4>
            <h2 className="second-title">Property Owner?</h2>
            <div className="contact-word">
              <p>
                Do you own a property and wish to sell or lease it without
                relying on an agent you may not trust?
              </p>
              <p>
                Our certified agent/relationship manager is ready to handle the
                sale or lease of your property on your behalf.
              </p>
              <p>
                Sit back and await your money while we manage the process for
                you.
              </p>
              <p>
                If this sounds like you, Kindly reach out to us{" "}
                <Link className="here-link" to="/contact-us">
                  here
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="pt-5 image">
            <img
              src="./sellAgentImage.avif"
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
