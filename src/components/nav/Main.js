import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { BiMenu } from "react-icons/bi";
export default function Main() {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const loggedIn = auth?.user !== null && auth?.token !== "";

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="d-flex  lead menu-container">
        <div className="menu-icon">
          <BiMenu size={30}></BiMenu>
        </div>

        {/* <span className="collapse navbar-collapse" id="navbarNavDropdown"> */}
        <div className="d-flex justify-content-center align-items-center h-menu">
          <nav className="nav d-flex lead">
            <NavLink
              className="nav-item nav-link"
              //  className="navbar-nav nav-item nav-link"
              aria-current="page"
              to="/search"
            >
              Search
            </NavLink>

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
              Agents
            </NavLink>
          </nav>
        </div>
        {/* </div> */}

        {/* <div className="col"> */}
        <div className="d-flex justify-content-center align-items-center">
          <nav
            className="nav  lead"
            // style={{ marginTop: "-3%" }}
          >
            <Link to={"/"}>
              <img src="./logo.png" alt="Korpea" height={50} width={70} />
            </Link>
            <NavLink
              className="nav-link d-none d-md-block"
              aria-current="page"
              to="/"
            >
              Realist NimbleByte
            </NavLink>
          </nav>
        </div>

        {/* <div className="col"> */}
        <div className="float-right">
          <nav className="nav d-flex lead">
            {loggedIn ? (
              <a
                className="nav-link pointer d-none d-lg-block"
                onClick={handlePostAdClick}
              >
                Post Ad
              </a>
            ) : (
              ""
            )}

            {!loggedIn ? (
              <>
                <NavLink className="nav-item nav-link" to="/login">
                  Login/Register
                </NavLink>
              </>
            ) : (
              ""
            )}

            {loggedIn ? (
              <div className="dropdown mr-auto">
                <li>
                  <a
                    className="nav-link dropdown-toggle pointer"
                    data-bs-toggle="dropdown"
                  >
                    {auth?.name
                      ? auth?.user?.firstname
                      : auth?.user?.email?.split("@")[0]}
                  </a>
                  <ul className="dropdown-menu px-3">
                    <li>
                      <NavLink
                        className="navbar-nav nav-item nav-link"
                        to="/dashboard"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="navbar-nav nav-item nav-link"
                        to="/ad/create"
                      >
                        Create an Ad
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="navbar-nav nav-item nav-link"
                        to="/user/profile"
                      >
                        Update profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="navbar-nav nav-item nav-link"
                        to="/user/settings"
                      >
                        Change Password
                      </NavLink>
                    </li>
                    <li>
                      <hr />
                    </li>
                    <li>
                      <a
                        onClick={logout}
                        className="navbar-nav nav-item nav-link"
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
        </div>
        {/* </span> */}
      </div>
    </>
  );
}
