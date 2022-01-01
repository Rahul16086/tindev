import React from "react";
import "./BannerCard.css";
// @ts-ignore
import profilePicture from "../../Ellipse 1.svg";
// @ts-ignore
import verified from "../../Vector.svg";
// @ts-ignore
import reactions from "../../Reactions.png";

const BannerCard = () => {
  return (
    <div className={"bannerOne__card"}>
      <div className={"bannerOne__card__profilePicture"}>
        <img src={profilePicture} alt={"profile"} />
      </div>
      <div className={"bannerOne__card__details"}>
        <div className={"bannerOne__card__details__nameAge"}>
          <p className={"bannerOne__card__details__nameAge__name"}>Lucifer</p>
          <p className={"bannerOne__card__details__nameAge__age"}>30</p>
        </div>
        <hr />
        <div className={"bannerOne__card__details__designation"}>
          <p>Senior Software Developer</p>
          <p>Recently Available</p>
          <p>Experience: 6 years</p>
          <img src={reactions} alt={"reactions"} />
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
