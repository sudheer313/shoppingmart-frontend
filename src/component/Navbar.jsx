import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const { loggedInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="navbar  navbar-expand-lg bg-light py-3 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fs-4 fw-bold" to="/">
          Shopping-Mart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactus">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="buttons">
            {loggedInUser ? (
              <>
                <span>{loggedInUser?.username}</span>
                <Link to="/cart" className="btn btn-outline-dark mx-2">
                  Cart ({cart.products.length})
                </Link>
                <button
                  className="btn btn-outline-dark px-4 py-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {" "}
                <Link to="/login" className="btn btn-outline-dark mx-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline-dark mx-2">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
