import React from "react";
import "./BannerTwo.css";
// @ts-ignore
import iphone from "../../Apple iPhone 11 Pro Space Grey.png";
import Button from "../Button/Button";

const BannerTwo = () => {
  return (
    <>
      <div className={"bannerTwo__mainContainer"}>
        <div className={"bannerTwo__mainContainer__partOne"}>
          <div className={"bannerTwo__leftContainer"}>
            <img src={iphone} alt={"iphone"} />
          </div>
          <div className={"bannerTwo__rightContainer"}>
            <h1>Swipe right to see what happens</h1>
            <p>
              It is the way to show interest on someone and willingness to code
              along!
            </p>
          </div>
        </div>
        <footer className={"bannerTwo__mainContainer__partTwo"}>
          <Button title={"Get In"} />
          <hr />
          <ul>
            <li>
              <p>FAQ</p>
            </li>
            <li>
              <p>Contact Us</p>
            </li>
            <li>
              <p>Careers</p>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default BannerTwo;
