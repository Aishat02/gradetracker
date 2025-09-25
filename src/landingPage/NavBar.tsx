import React from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import logo from "/logo.svg";

/**
 * Responsive Navbar Component
 * Includes offcanvas for mobile, smooth scroll navigation for sections,
 * and login routing using React Router.
 */

const NavBar: React.FC = () => {
  return (
    <nav
      className="navbar fixed-top navbar-expand-md bg-white shadow-sm"
      id="navbar"
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="logo" width="30" height="24" />
          GradeTracker
        </a>

        {/* Toggler for Offcanvas Menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          data-bs-scroll="true"
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body justify-content-end">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link
                  to="header"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="nav-link cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="features"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="nav-link cursor-pointer"
                >
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="faq"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="nav-link cursor-pointer"
                >
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link bg-gray rounded" to="login">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
