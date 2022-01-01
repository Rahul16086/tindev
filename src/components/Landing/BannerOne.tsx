import React from "react";
import "./BannerOne.css";
import BannerCard from "../BannerCard/BannerCard";
import { Link } from "react-router-dom";

const BannerOne = () => {
  return (
    <div className={"bannerOne__mainContainer"}>
      <div className={"bannerOne__leftContainer"}>
        <h1>Match. Chat. Code. Conquer!</h1>
        <p>Go beyond your social circle, get a partner, code along!</p>
        <Link to={"/signup"}>
          <button>Join</button>
        </Link>
      </div>
      <div className={"bannerOne__rightContainer"}>
        <BannerCard />
      </div>
    </div>
  );
};

export default BannerOne;
