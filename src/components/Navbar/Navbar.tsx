import React from "react";
import "./Navbar.css";
import Button from "../Button/Button";

const Navbar = () => {
  return (
    <header className={"header__mainContainer"}>
      <div className={"header__leftContainer"}>
        <a href={"/"}>
          <h1>{"<tinDev/>"}</h1>
        </a>
        <div className={"header__leftContainer__option"}>
          <span>How to</span>
        </div>
      </div>
      <div className={"header__rightContainer"}>
        <Button title={"Login"} />
      </div>
    </header>
  );
};

export default Navbar;
