import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import useSelection from "antd/es/table/hooks/useSelection";
// import "./index.css";

const Navbar = () => {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const logout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const loggedIn = auth?.user !== null && auth?.token !== "";

  // const handlePostAdClick = () => {
  //   if (loggedIn) {
  //     navigate("/ad/create");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  const handleCreateAdClick = () => {
    if (selectedOption === "Sale") {
      navigate("/ad/create-sale");
    } else if (selectedOption === "Rent") {
      navigate("/ad/create-rent");
    } else if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light justify-content-center fixed-top"
        id="custom-nav"
      >
        <div className="container">
          <span className="navbar-brand d-flex w-50 me-auto">
            <nav className="nav lead">
              <Link to={"/"}>
                <img
                  src="./nimblelogo2.png"
                  alt="NimbleByte"
                  height={50}
                  width={50}
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
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse collapse w-100"
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
              >
                Buy
              </NavLink>

              <NavLink
                className="nav-item nav-link"
                aria-current="page"
                to="/rent"
              >
                Rent
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                aria-current="page"
                to="/agents"
              >
                Sell
              </NavLink>
            </ul>
            <ul className="nav navbar-nav ms-auto w-100 justify-content-end">
              <nav className="navbar-nav lead">
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
                          >
                            Sale
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/ad/create/rent/house"
                          >
                            Rent
                          </NavLink>
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
                    >
                      Login
                    </NavLink>
                    <>
                      <NavLink
                        className="nav-item nav-link"
                        aria-current="page"
                        to="/register"
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
                          <NavLink className="dropdown-item" to="/dashboard">
                            {auth.user?.role?.includes("Seller")
                              ? "Dashboard"
                              : "Wishlist"}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="/user/profile">
                            Update profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/user/update-password"
                          >
                            Change Password
                          </NavLink>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            onClick={logout}
                            // className="navbar-nav nav-item nav-link"
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
