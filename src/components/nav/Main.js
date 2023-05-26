import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

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

  // const loggedIn =
  //   auth.user !== null && auth.token !== "" && auth.refreshToken !== "";
  const loggedIn = auth?.user !== null && auth?.token !== "";

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="nav d-flex justify-content-between lead">
      <NavLink className="nav-link" aria-current="page" to="/">
        Realist Korpea
      </NavLink>

      <NavLink className="nav-link" aria-current="page" to="/search">
        Search
      </NavLink>

      <NavLink className="nav-link" aria-current="page" to="/buy">
        Buy
      </NavLink>

      <NavLink className="nav-link" aria-current="page" to="/rent">
        Rent
      </NavLink>

      <NavLink className="nav-link" aria-current="page" to="/agents">
        Our Agents
      </NavLink>

      {loggedIn ? (
        <a className="nav-link pointer" onClick={handlePostAdClick}>
          Post Ad
        </a>
      ) : (
        ""
      )}

      {!loggedIn ? (
        <>
          <NavLink className="nav-link" to="/login">
            Login/Register
          </NavLink>
        </>
      ) : (
        ""
      )}

      {loggedIn ? (
        <div className="dropdown">
          <li>
            <a
              className="nav-link dropdown-toggle pointer"
              data-bs-toggle="dropdown"
            >
              {auth?.name ? auth?.user?.name : auth?.user?.email?.split("@")[0]}
            </a>
            <ul className="dropdown-menu">
              <li>
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/user/profile">
                  Update profile
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/user/settings">
                  Change Password
                </NavLink>
              </li>
              <hr />
              <li>
                <a onClick={logout} className="nav-link">
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
  );
}
