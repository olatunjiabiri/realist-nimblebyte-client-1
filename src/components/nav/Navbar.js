import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";
import { useData } from "../../context/adData";
import Modall from "../modal/Modal";
import DeleteAccount from "../../pages/auth/deleteAccount/DeleteAccount";

// import useSelection from "antd/es/table/hooks/useSelection";
// import "./index.css";

const Navbar = () => {
  // context
  const [auth, setAuth] = useAuth();
  const [ddata, setDdata] = useData();

  // hooks
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setDeleteIsOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [deleteIsOpen1, setDeleteIsOpen1] = useState(false);
  const navbarRef = useRef(null);

  const handleRentClick = (event) => {
    // Prevent default link behavior
    event.preventDefault();
    const approved = auth?.user?.info?.isApproved;
    setMobileMenuOpen(false);

    // Check if the modal should be opened
    if (approved) {
      navigate("/ad/create/rent/house");
    } else {
      setIsOpen(true);
    }
  };

  const handleSaleClick = (event) => {
    // Prevent default link behavior
    event.preventDefault();
    const approved = auth?.user?.info?.isApproved;
    setMobileMenuOpen(false);

    // Check if the modal should be opened
    if (approved) {
      navigate("/ad/create/sell/house");
    } else {
      setIsOpen(true);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const logout = () => {
    setAuth({ user: null, token: "" });
    setDdata({ adData: null });

    localStorage.removeItem("auth");
    localStorage.removeItem("cLocation");
    localStorage.removeItem("adData");
    localStorage.removeItem("profileFormData");
    localStorage.removeItem("profile");

    navigate("/login");
  };

  const loggedIn = auth?.user !== null && auth?.token !== "";

  useEffect(() => {
    const closeMobileMenuOnOutsideClick = (e) => {
      if (
        mobileMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(e.target)
      ) {
        closeMobileMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("click", closeMobileMenuOnOutsideClick);
    }

    return () => {
      document.removeEventListener("click", closeMobileMenuOnOutsideClick);
    };
  }, [mobileMenuOpen]);

  // const handlePostAdClick = () => {
  //   if (loggedIn) {
  //     navigate("/ad/create");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // const handleCreateAdClick = () => {
  //   if (selectedOption === "Sale") {
  //     navigate("/ad/create-sale");
  //   } else if (selectedOption === "Rent") {
  //     navigate("/ad/create-rent");
  //   } else if (loggedIn) {
  //     navigate("/ad/create");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  return (
    <>
      <Modall handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <p className="header-modal">Request Pending Approval</p>
        <div className="info-modal">
          {/* Dear{auth?.user?.lastName},
          <br />
          <br /> */}
          Your application to become an agent is under review. We typically
          process requests within 1-3 business days. You will receive an email
          once a decision is made.
          <br />
          <br />
          For any queries, feel free to contact us.
          <br />
          <br />
          NimbleCasa Team
        </div>
      </Modall>

      <Modall
        handleClose={() => setIsOpen(setDeleteIsOpen)}
        isOpen={isDeleteOpen}
        styling="modal-content"
      >
        {/* <p className="header-modal">Delete Account</p> */}
        <DeleteAccount />
      </Modall>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light justify-content-center fixed-top"
        id="custom-nav"
        style={{
          position: "relative",
        }}
        ref={navbarRef}
      >
        <div className="container">
          <span className="navbar-brand d-flex w-25 me-auto">
            <nav className="nav lead">
              <Link to={"/"} onClick={closeMobileMenu}>
                <img
                  style={{
                    position: "absolute",
                    top: "-10px",
                  }}
                  src="https://nimblecasauatstorage.blob.core.windows.net/nimblecasa-icons/nimble-logo2.png"
                  alt="NimbleCasa"
                  height={80}
                  width={130}
                />
              </Link>
            </nav>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsingNavbar3"
            data-bs-auto-close="true"
            onClick={toggleMobileMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`navbar-collapse collapse w-100 ${
              mobileMenuOpen ? "show" : ""
            }`}
            id="collapsingNavbar3"
          >
            <ul className="navbar-nav w-100 justify-content-center justify-content-around">
              {/* <NavLink
                className="nav-item nav-link"
                aria-current="page"
                to="/search"
              >
                Search
              </NavLink> */}

              <NavLink
                className="nav-item nav-link"
                aria-current="page"
                to="/buy"
                onClick={closeMobileMenu}
              >
                Buy
              </NavLink>

              <NavLink
                className="nav-item nav-link"
                aria-current="page"
                to="/rent"
                onClick={closeMobileMenu}
              >
                Rent
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                aria-current="page"
                to="/contact-agents"
                onClick={closeMobileMenu}
              >
                Sell
              </NavLink>
              {/* <NavLink
                className="nav-item nav-link"
                aria-current="page"
                to="/agents"
                onClick={closeMobileMenu}
              >
                Sell2
              </NavLink> */}
              <NavLink
                className="nav-item nav-link"
                aria-current="page"
                to="/contact-us"
                onClick={closeMobileMenu}
              >
                Contact Us
              </NavLink>
            </ul>
            <ul className="nav navbar-nav ms-auto w-100 justify-content-end">
              <nav className="navbar-nav lead">
                {auth?.user?.role?.includes("Agent") ||
                auth?.user?.role?.includes("Admin") ? (
                  <div className="dropdown mr-auto">
                    <li>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarScrollingDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Create Ad
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="navbarScrollingDropdown"
                      >
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/ad/create/sell/house"
                            onClick={handleSaleClick}
                          >
                            Sale
                          </NavLink>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            to="/ad/create/rent/house"
                            onClick={handleRentClick}
                          >
                            Rent
                          </a>
                        </li>
                      </ul>
                    </li>
                  </div>
                ) : (
                  ""
                )}
                {!loggedIn ? (
                  <>
                    <NavLink
                      className="nav-item nav-link"
                      aria-current="page"
                      to="/login"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </NavLink>
                    <>
                      <NavLink
                        className="nav-item nav-link"
                        aria-current="page"
                        to="/register"
                        onClick={closeMobileMenu}
                      >
                        Register
                      </NavLink>
                    </>
                  </>
                ) : (
                  ""
                )}

                {loggedIn ? (
                  <div className="dropdown mr-auto">
                    <li>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarScrollingDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth?.name
                          ? auth?.user?.firstname
                          : auth?.user?.email?.split("@")[0]}
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="navbarScrollingDropdown"
                      >
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/dashboard"
                            onClick={closeMobileMenu}
                          >
                            {auth?.user?.role?.includes("Agent")
                              ? "Dashboard"
                              : "Wishlist"}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/user/profile"
                            onClick={closeMobileMenu}
                          >
                            Update Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/user/update-password"
                            onClick={closeMobileMenu}
                          >
                            Change Password
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="#"
                            onClick={() => {
                              closeMobileMenu();
                              setDeleteIsOpen(true);
                            }}
                          >
                            Delete Account
                          </NavLink>
                        </li>
                        <li>
                          {/* <li className="nav-item dropdown"> */}
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            // onClick={closeMobileMenu}
                          >
                            Manage Account
                          </a>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <NavLink
                              className="dropdown-item"
                              to="/user/delete-account"
                              onClick={() => {
                                closeMobileMenu();
                                setDeleteIsOpen(true);
                              }}
                            >
                              Delete Account
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/user/deactivate-account"
                              onClick={() => {
                                closeMobileMenu();
                                // handle deactivate account action
                              }}
                            >
                              Deactivate Account
                            </NavLink>
                          </div>
                        </li>

                        {!auth.user?.role?.includes("Agent") && (
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/user/be-agent"
                              onClick={closeMobileMenu}
                            >
                              Become an Agent
                            </NavLink>
                          </li>
                        )}
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              closeMobileMenu();
                              logout();
                              // You can also add other logic here if needed
                            }}
                            className="dropdown-item"
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </div>
                ) : (
                  ""
                )}
              </nav>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
