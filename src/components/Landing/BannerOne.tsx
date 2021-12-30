import React from "react";
import "./BannerOne.css";
import Button from "../Button/Button";
import BannerCard from "../BannerCard/BannerCard";

const BannerOne = () => {
  return (
    <div className={"bannerOne__mainContainer"}>
      <div className={"bannerOne__leftContainer"}>
        <h1>Match. Chat. Code. Conquer!</h1>
        <p>Go beyond your social circle, get a partner, code along!</p>
        <button>Join</button>
      </div>
      <div className={"bannerOne__rightContainer"}>
        <BannerCard />
      </div>
    </div>
  );
};

export default BannerOne;
