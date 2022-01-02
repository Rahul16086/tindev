import React from "react";
import "./MatchMaker.css";
// @ts-ignore
import profilePicture from "../../../Ellipse 1.svg";
import RightPaneCardMain from "./RightPaneCards/RightPaneCardMain";
import RightPaneCardDevInfo from "./RightPaneCards/RightPaneCardDevInfo";

const MatchMaker: React.FC = () => {
  return (
    <div className={"matchmaker__mainContainer"}>
      <div className={"matchmaker__leftPane"}>
        <div className={"matchmaker__leftPane__nav"}>
          <img src={profilePicture} alt={"profilePicture"} />
          <h1>Lucifer</h1>
        </div>
        <div className={"matchmaker__leftPane__options"}>
          <p>Matches</p>
          <p>Messages</p>
        </div>
        <div className={"matchmaker__leftPane__content"}>
          <p>No Matches.... Start matching⚡</p>
        </div>
      </div>
      <div className={"matchmaker__rightPane"}>
        <RightPaneCardMain />
        <RightPaneCardDevInfo />
      </div>
    </div>
  );
};

export default MatchMaker;
