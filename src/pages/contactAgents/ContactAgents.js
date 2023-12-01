import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactAgents = () => {
  return (
    <div className="container-fluid p-5 m-5">
      <div className="row m-0">
        <div className="col-lg-6 p-5">
          
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div style={{ padding: "20px", textAlign: "left", width: "100%", marginLeft: "10px" }}>
              <div>
                <h4>Contact an Agent to Sell or Lease your Property</h4>
              </div>
              <div>
                <h2>Property Owner?</h2>
                <p>
                  Do you own a property and wish to sell or lease it without relying
                  on an agent you may not trust?
                </p>
                <p>
                  Our certified agent/relationship manager is ready to handle the
                  sale or lease of your property on your behalf.
                </p>
                <p>
                  Sit back and await your money while we manage the process for you.
                </p>
                <p>
                  If this sounds like you, Kindly reach out to us <a href="*">here</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 p-5">
          
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div style={{ padding: "20px", textAlign: "center", width: "100%" }}>
              <h2>Image Column</h2>
              <img
                src="https://via.placeholder.com/300" 
                alt="Placeholder"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAgents;
