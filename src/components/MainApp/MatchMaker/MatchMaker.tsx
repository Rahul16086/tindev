import React from "react";
import "./MatchMaker.css";
// @ts-ignore
import profilePicture from "../../../Ellipse 1.svg";
import RightPaneCardMain from "./RightPaneCards/RightPaneCardMain";
import RightPaneCardDevInfo from "./RightPaneCards/RightPaneCardDevInfo";
import { Link } from "react-router-dom";

const MatchMaker: React.FC = () => {
  return (
    <div className={"matchmaker__mainContainer"}>
      <div className={"matchmaker__leftPane"}>
        <div className={"matchmaker__leftPane__nav"}>
          <Link to={"/app/profile"}>
            <div className={"matchmaker__leftPane__nav__profile"}>
              <img src={profilePicture} alt={"profilePicture"} />
              <p>Lucifer</p>
            </div>
          </Link>
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
        <RightPaneCardMain actions={true} />
        <RightPaneCardDevInfo />
      </div>
    </div>
  );
};

export default MatchMaker;
