import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Viajes from "../imagen/Viajes.png";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body sticky-top"
      data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">
        <img src={Viajes} alt="logo" width="40" height="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
                to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
                to="/new">
                Create Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
                to="/profile">
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex" role="search">
          <button className="btn btn-outline-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;