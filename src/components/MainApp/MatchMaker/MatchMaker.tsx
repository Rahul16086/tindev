import React, { useEffect, useState } from "react";
import "./MatchMaker.css";
import profilePicture from "../../../images/Ellipse 1.svg";
import RightPaneCardMain from "./RightPaneCards/RightPaneCardMain";
import RightPaneCardDevInfo from "./RightPaneCards/RightPaneCardDevInfo";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const MatchMaker: React.FC = () => {
  const [currentCardData, setCurrentCardData]: any = useState(null);
  const [currentRightCardData, setCurrentRightCardData]: any = useState([]);
  const [changed, setChanged]: any = useState(false);
  const [matches, setMatches]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const [matchesActiveState, setMatchesActiveState]: any = useState(true);
  const [messagesActiveState, setMessagesActiveState]: any = useState(false);
  const token = localStorage.getItem("token");

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const matchesRaw = await fetch(
        "http://localhost:8080/app/matchmaker?userId=" + userId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const matchedData = await matchesRaw.json();

      if (matchedData.cardData?.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * matchedData.cardData.length
        );
        setCurrentCardData(matchedData.cardData[randomIndex]);
        const { links, summary } = matchedData.cardData[randomIndex];
        const rightCardDevInfoArray = [];
        rightCardDevInfoArray.push(
          { Github: links?.github },
          { LinkedIn: links?.linkedIn },
          { Portfolio: links?.portfolio },
          { Summary: summary }
        );
        setCurrentRightCardData(rightCardDevInfoArray);
      } else {
        setCurrentCardData(null);
        setCurrentRightCardData(null);
      }

      setMatches(matchedData.leftPane);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const added = () => {
    setChanged(() => !changed);
  };

  const matchesActiveToggle = () => {
    setMatchesActiveState(true);
    setMessagesActiveState(false);
  };

  const messagesActiveToggle = () => {
    setMessagesActiveState(true);
    setMatchesActiveState(false);
  };

  useEffect(() => {
    fetchMatches();
  }, [changed]);

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
          <p
            className={matchesActiveState ? "active" : ""}
            onClick={matchesActiveToggle}
          >
            Matches
          </p>
          <p
            className={messagesActiveState ? "active" : ""}
            onClick={messagesActiveToggle}
          >
            Messages
          </p>
        </div>
        <div className={"matchmaker__leftPane__content"}>
          {matchesActiveState && matches.length > 0 && (
            <div className={"matchmaker__leftPane__content__matches"}>
              {matches.map((match: any) => (
                <div
                  key={Math.random()}
                  className={
                    "matchmaker__leftPane__content__matches__individual"
                  }
                >
                  <img src={profilePicture} alt={"luci"} />
                  <p>{match.name}</p>
                </div>
              ))}
            </div>
          )}
          {matchesActiveState && matches.length === 0 && (
            <p>No Matches.... Start matching⚡</p>
          )}
          {messagesActiveState && <p>No messages, Start messaging!!</p>}
        </div>
      </div>

      {loading ? (
        <>
          <Loader />
        </>
      ) : currentCardData ? (
        <div className={"matchmaker__rightPane"}>
          <RightPaneCardMain
            actions={true}
            userData={currentCardData}
            onAdd={added}
          />
          <RightPaneCardDevInfo data={currentRightCardData} />
        </div>
      ) : (
        <div className={"matchmaker__rightPane"}>
          <p>No matches that meets your criteria!!</p>
        </div>
      )}
    </div>
  );
};

export default MatchMaker;
