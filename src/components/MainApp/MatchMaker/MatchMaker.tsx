import React, { useEffect, useState } from "react";
import "./MatchMaker.css";
// @ts-ignore
import profilePicture from "../../../Ellipse 1.svg";
import RightPaneCardMain from "./RightPaneCards/RightPaneCardMain";
import RightPaneCardDevInfo from "./RightPaneCards/RightPaneCardDevInfo";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const MatchMaker: React.FC = () => {
  const [currentCardData, setCurrentCardData]: any = useState([]);
  const [currentRightCardData, setCurrentRightCardData]: any = useState([]);

  const fetchMatches = async () => {
    const userId = localStorage.getItem("userId");
    const matches = await fetch("http://localhost:8080/app/matchmaker");
    const matchedData = await matches.json();
    const filteredMatchedData = matchedData.matches.filter((data: any) => {
      if (!(data._id.toString() === userId?.toString())) {
        return data;
      }
    });
    const min = 0,
      max = filteredMatchedData.length - 1;

    const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
    setCurrentCardData(filteredMatchedData[randomIndex]);

    const { links, summary } = filteredMatchedData[randomIndex];
    const rightCardDevInfoArray = [];
    rightCardDevInfoArray.push(
      { Github: links?.github },
      { LinkedIn: links?.linkedIn },
      { Portfolio: links?.portfolio },
      { Summary: summary }
    );
    setCurrentRightCardData(rightCardDevInfoArray);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className={"matchmaker__mainContainer"}>
      <div className={"matchmaker__leftPane"}>
        <div className={"matchmaker__leftPane__nav"}>
          <Link to={"/app/profile"}>
            <div className={"matchmaker__leftPane__nav__profile"}>
              <img src={profilePicture} alt={"profilePicture"} />
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
        <RightPaneCardMain actions={true} userData={currentCardData} />
        <RightPaneCardDevInfo data={currentRightCardData} />
      </div>
    </div>
  );
};

export default MatchMaker;
