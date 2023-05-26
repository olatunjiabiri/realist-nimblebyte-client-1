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
    <>
      <div className="row">
        <div className="col">
          <nav className="nav d-flex  lead">
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
          </nav>
        </div>

        <div className="col">
          <nav
            className="nav d-flex justify-content-center align-items-center lead"
            style={{ marginTop: "-3%" }}
          >
            <img
              src="./logo.png"
              alt="Korpea"
              to={"/"}
              height={70}
              width={100}
            />
            <NavLink className="nav-link" aria-current="page" to="/">
              Realist Korpea
            </NavLink>
          </nav>
        </div>

        <div className="col">
          <nav className="nav d-Fflex  lead float-right">
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
                    {auth?.name
                      ? auth?.user?.firstname
                      : auth?.user?.email?.split("@")[0]}
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
        </div>
      </div>
    </>
  );
}
