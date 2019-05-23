import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/movies">
          Movies
        </NavLink>
      </li>

      {user && (
        <React.Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              {user.name}
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              logout
            </NavLink>
          </li>
        </React.Fragment>
      )}

      {!user && (
        <React.Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Registration
            </NavLink>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavBar;
