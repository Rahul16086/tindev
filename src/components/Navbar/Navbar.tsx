import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className={"header__mainContainer"}>
      <div className={"header__leftContainer"}>
        <a href={"/"}>
          <h1>{"<tinDev/>"}</h1>
        </a>
        <span>How to</span>
      </div>
      <div className={"header__rightContainer"}>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
