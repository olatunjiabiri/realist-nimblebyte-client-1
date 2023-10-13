import { NavLink, Link } from "react-router-dom";
import React from "react";
import "./index.css";

export default function Footer() {
  return (
    <div className="container-fluid">
      <div className="row align-items-left text-left p-4 bg-dark text-light pt-4">
        <div className="col-8">
          <h4 className="mt-4">Realist App - Buy, Sell or Rent Properties</h4>
          <p className="mt-3">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>

        <div className="col-4 text-light">
          <div className="link footer-color" style={{ listStyleType: "none" }}>
            <div className="mt-4">Quick Links</div>

            <Link to="/">
              <img
                src="./home3.png"
                className="footer-nav-img"
                alt="Home"
                height={35}
                width={35}
              />
            </Link>
            <Link to="/buy">
              <img
                src="./buy.png"
                className=" footer-nav-img"
                alt="buy"
                height={35}
                width={35}
              />
            </Link>
            <Link to="/rent">
              <img
                src="./rent.png"
                className=" footer-nav-img"
                alt="rent"
                height={35}
                width={35}
              />
            </Link>
            <Link to="/agents">
              <img
                src="./ouragents.png"
                className=" footer-nav-img"
                alt="ouragents"
                height={35}
                width={35}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
