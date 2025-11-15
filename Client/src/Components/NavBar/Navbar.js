import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Navbar = (props) => {
  return (
    <div className="navbar-container">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="PawFinds Logo" />
          <p>{props.title}</p>
        </Link>
      </div>
      <div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/services">Dịch vụ</Link>
          </li>
          <li>
            <Link to="/pets">Thú cưng</Link>
          </li>
          <li>
            <Link to="/contact">Liên hệ</Link>
          </li>
        </ul>
      </div>
      <div>
        <Link to="/services">
          <button className="Navbar-button">Gửi thú cưng</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
