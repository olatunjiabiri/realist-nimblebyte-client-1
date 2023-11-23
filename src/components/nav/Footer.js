import { NavLink, Link } from "react-router-dom";
import React from "react";
import "./index.css";

export default function Footer() {
  return (
    <div className="container-fluid align-items-left text-left p-4 bg-dark text-light pt-4 footer-word">
      <div className="container">
        <div className="footer-row row">
          <div className="col-12 col-md-8 footer-word1">
            <h4 className="mt-4">NimbleCasa - Real Estate, The Right Way</h4>
            {/* <h4 className="mt-4">NimbleCasa - Buy, Sell or Rent Properties</h4> */}
            <p className="mt-3">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="col-12 col-md-4 text-light footer-links">
            <h4 className="mt-4 q-link">Quick Links</h4>
            <div
              className="link footer-color"
              style={{ listStyleType: "none" }}
            >
              <Link to="/">
                <img
                  src="./home3.png"
                  className="footer-nav-img"
                  alt="Home"
                  height={30}
                  width={30}
                />
              </Link>
              <Link to="/buy">
                <img
                  src="./buy.png"
                  className=" footer-nav-img"
                  alt="buy"
                  height={30}
                  width={30}
                />
              </Link>
              <Link to="/rent">
                <img
                  src="./rent.png"
                  className=" footer-nav-img"
                  alt="rent"
                  height={30}
                  width={30}
                />
              </Link>
              <Link to="/agents">
                <img
                  src="./ouragents.png"
                  className=" footer-nav-img"
                  alt="ouragents"
                  height={30}
                  width={30}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
