import React from 'react'
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      {/* <div className="d-flex align-items-center" style={{backgroundImage:"url(/banner2.png)", backgroundSize:"auto 100%", backgroundPosition: "left top", height:300, width:"100%"}}></div> */}

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user/wishlist">
            Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user/enquiries">
            Enquiries
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/ad/create">
            Create Ad
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user/settings">
            Settings
          </NavLink>
        </li>
      </ul>
    </>
  );
}
