import React from "react";
import "./Navbar.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className={"header__mainContainer"}>
      <div className={"header__leftContainer"}>
        <Link to={"/"}>
          <h1>{"<tinDev/>"}</h1>
        </Link>
        <div className={"header__leftContainer__option"}>
          <span>How to</span>
        </div>
      </div>
      <div className={"header__rightContainer"}>
        <Link to={"/login"}>
          <Button title={"Login"} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
