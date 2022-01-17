import React, { useEffect, useState } from "react";
import "./MatchMaker.css";
// @ts-ignore
import profilePicture from "../../../Ellipse 1.svg";
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

  const fetchMatches = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    const matchesRaw = await fetch("http://localhost:8080/app/matchmaker");
    const matchedData = await matchesRaw.json();
    const currentUser: any[] = [];

    if (matchedData) {
      const filteredMatchedData = matchedData.matches.filter((data: any) => {
        if (!(data._id.toString() === userId?.toString())) {
          return data;
        } else {
          currentUser.push(data);
        }
      });

      let finalFilter = [];
      if (currentUser[0].matches?.length > 0) {
        finalFilter = filteredMatchedData.filter((data: any) => {
          if (currentUser[0].matches?.indexOf(data._id.toString()) === -1) {
            return data;
          }
        });
      } else {
        finalFilter = [...filteredMatchedData];
      }

      if (finalFilter?.length > 0) {
        const randomIndex = Math.floor(Math.random() * finalFilter.length);
        setCurrentCardData(finalFilter[randomIndex]);
        const { links, summary } = finalFilter[randomIndex];
        const rightCardDevInfoArray = [];
        rightCardDevInfoArray.push(
          { Github: links?.github },
          { LinkedIn: links?.linkedIn },
          { Portfolio: links?.portfolio },
          { Summary: summary }
        );
        setCurrentRightCardData(rightCardDevInfoArray);
        setLoading(false);
      }

      if (currentUser[0]?.matches.length > 0) {
        const matchesArray: { name: any; _id: any }[] = [];
        currentUser[0].matches.map((matchId: any) => {
          matchedData.matches.map((match: any) => {
            if (matchId.toString() === match._id.toString()) {
              matchesArray.push({ name: match.name, _id: match._id });
            }
          });
        });
        setMatches(matchesArray);
        setLoading(false);
      }
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
