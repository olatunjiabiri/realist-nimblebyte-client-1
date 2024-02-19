import { NavLink, Link } from "react-router-dom";
import React from "react";
import Tooltip from "@mui/material/Tooltip";

import "./index.css";

export default function Footer() {
  return (
    <div className="container-fluid align-items-left text-left p-4 bg-dark text-light pt-4 footer-word footer--pin">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
          <div className="col col-lg-6 col-md-12 footer-word1">
            <h4 className="mt-4">NimbleCasa - Real Estate, The Right Way</h4>
            <ul className="social-links pt-2">
              <li>
                <Tooltip title="Instagram" placement="bottom">
                  <a
                    href="https://www.instagram.com/nimblecasa/"
                    target="_blank"
                    aria-label="Visit us on instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className="bi bi-instagram"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                  </a>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Facebook" placement="bottom">
                  <a
                    href="https://www.facebook.com/profile.php?id=61554805858914"
                    target="_blank"
                    aria-label="Visit us on facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className="bi bi-facebook"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                    </svg>
                  </a>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Twitter" placement="bottom">
                  <a
                    href="https://twitter.com/NimbleCasa"
                    target="_blank"
                    aria-label="Visit us on twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className="bi bi-twitter-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                    </svg>
                  </a>
                </Tooltip>
              </li>
            </ul>
            {/* <h4 className="mt-4">NimbleCasa - Buy, Sell or Rent Properties</h4> */}
            <p>
              &copy; {new Date().getFullYear()}. A product of{" "}
              <a
                className="NimbleByteLink"
                href="https://nimble-byte.com/"
                target="_blank"
                aria-label="NimbleByte homepage"
              >
                Nimble-Byte
              </a>
            </p>
          </div>

          <div className="col col-lg-3 col-md-6 footer-info">
            <h4 className="mt-4">Information</h4>
            <ul className="social-doc">
              {/* <li>
                <a href="#">FAQS</a>
              </li> */}
              <li>
                <Link to="/terms-of-use"> TERMS OF USE </Link>
              </li>
              <li>
                <Link to="/privacy-policy">PRIVACY POLICY</Link>
              </li>
            </ul>
            <div className="mobile-links-container">
              <Tooltip
                title="Get it on Google Play"
                // placement="bottom"
                sx={{ background: "red" }}
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.nimblecasa.app"
                  target="_blank"
                >
                  <img
                    className="app-download-image"
                    src="https://nimblecasauatstorage.blob.core.windows.net/nimblecasa-icons/google-app-download-badge-284x84.png"
                    alt="Get it on Google Play"
                    aria-label="Get it on Google Play"
                  />
                </a>
              </Tooltip>
              <Tooltip
                title="Download on the App Store"
                // placement="bottom"
              >
                <a
                  href="https://apps.apple.com/ng/app/nimblecasa-real-estate-app/id6477383845"
                  target="_blank"
                >
                  <img
                    className="app-download-image"
                    src="https://nimblecasauatstorage.blob.core.windows.net/nimblecasa-icons/apple-app-download-badge-284x84.png"
                    alt="Download on the App Store"
                    aria-label="Download on the App Store"
                  />
                </a>
              </Tooltip>
            </div>
          </div>

          <div className="col col-lg-3 col-md-6 text-light footer-links">
            <h4 className="mt-4 q-link">Quick Links</h4>
            <div
              className="link footer-color"
              style={{ listStyleType: "none" }}
            >
              <Tooltip title="Home" placement="bottom">
                <Link to="/" aria-label="Home">
                  <img
                    src="https://nimblecasauatstorage.blob.core.windows.net/nimblecasa-icons/home3.png"
                    className="footer-nav-img"
                    alt="Home"
                    height={30}
                    width={30}
                  />
                </Link>
              </Tooltip>
              <Tooltip title="Buy" placement="bottom">
                <Link to="/buy" aria-label="Buy">
                  <img
                    src="https://nimblecasauatstorage.blob.core.windows.net/nimblecasa-icons/Buy.png"
                    className=" footer-nav-img"
                    alt="buy"
                    height={30}
                    width={30}
                  />
                </Link>
              </Tooltip>
              <Tooltip title="Rent" placement="bottom">
                <Link to="/rent" aria-label="Rent">
                  <img
                    src="https://nimblecasauatstorage.blob.core.windows.net/nimblecasa-icons/rent.png"
                    className=" footer-nav-img"
                    alt="rent"
                    height={30}
                    width={30}
                  />
                </Link>
              </Tooltip>
              <Tooltip title="Our Agents" placement="bottom">
                <Link to="/contact-agents" aria-label="Our Agents">
                  <img
                    src="https://nimblecasauatstorage.blob.core.windows.net/nimblecasa-icons/ouragents.png"
                    className=" footer-nav-img"
                    alt="ouragents"
                    height={30}
                    width={30}
                  />
                </Link>
              </Tooltip>
            </div>
          </div>
        </div>
        {/* <div className="row d-flex justify-content-center pt-2 nimblebyte ">
          A product of Nimble-Byte
        </div> */}
      </div>
    </div>
  );
}
