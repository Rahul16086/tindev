import React from "react";
import "./BannerCard.css";
// @ts-ignore
import profilePicture from "../../Ellipse 1.svg";
// @ts-ignore
import verified from "../../Vector.svg";

const BannerCard = () => {
  return (
    <div className={"bannerOne__card"}>
      <img src={profilePicture} alt={"profile"} />
      <div className={"bannerOne__card__nameAge"}>
        <h1>Lucifer</h1>
        <p>30</p>
        <img src={verified} alt={"verified"} />
      </div>
      <div className={"bannerOne__card__designation"}>
        <p>Senior Software Developer</p>
      </div>
    </div>
  );
};

export default BannerCard;
