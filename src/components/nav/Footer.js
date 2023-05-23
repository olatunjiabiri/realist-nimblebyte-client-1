import { NavLink, Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container">
      <div className="row align-items-left text-left p-4 bg-dark text-light mt-4">
        <div className="col-8">
          <h4 className="mt-4">Realist App - Buy Sell or Rent Properties</h4>
          <p className="mt-3">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>

        <div className="col-4 text-light">
          <ul style={{ listStyleType: "none", color: "white" }}>
            <li>Quick Links</li>
            <li>
              <Link style={{ color: "white" }} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link style={{ color: "white" }} to="/search">
                Search
              </Link>
            </li>
            <li>
              <Link style={{ color: "white" }} to="/buy">
                Buy
              </Link>
            </li>
            <li>
              <Link style={{ color: "white" }} to="/rent">
                Rent
              </Link>
            </li>
            <li>
              <Link style={{ color: "white" }} to="/agents">
                Our Agents
              </Link>
            </li>
          </ul>
          {/* <span align-item-end>
            <Link> <i clasName="bi bi-chevron-up"></i>Top </Link>
            </span> */}
        </div>
      </div>
    </div>
  );
}
