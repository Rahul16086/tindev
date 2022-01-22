import React from "react";
import "./RightPaneCardMain.css";
import profilePicture from "../../../../images/Ellipse 1.svg";
import reject from "../../../../images/Reactions/Reject.svg";
import showPrevious from "../../../../images/Reactions/Show Previous.svg";
import favorite from "../../../../images/Reactions/Favorite.svg";
import match from "../../../../images/Reactions/Match.svg";
import { CardSwiper } from "react-card-rotate-swiper";

export type user = {
  _id?: string;
  name?: string;
  age?: number;
  designation?: string;
  experience?: string;
  skills?: any;
  email?: string;
  phoneNumber?: number;
  matchRadius?: number;
  links?: object;
  lookingFor?: string;
  experienceLevel?: string;
};

const RightPaneCardMain: React.FC<{
  actions: boolean;
  userData?: user;
  onAdd?: any;
  message?: string;
  skills?: any;
}> = (props) => {
  const token = localStorage.getItem("token");
  console.log(props);
  const matchActions = async (
    actionUserId: string | undefined,
    action: string | undefined
  ) => {
    try {
      const userId = localStorage.getItem("userId");
      let finalAction = {};
      switch (action) {
        case "reject":
          finalAction = { rejectUserId: actionUserId };
          break;
        case "match":
          finalAction = { matchUserId: actionUserId };
          break;
        case "favorite":
          finalAction = { favoriteUserId: actionUserId };
          break;
        default:
          finalAction = {};
      }

      const addMatchToUser = await fetch(
        "http://localhost:8080/app/matchmaker/add-match",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            userId: userId,
            finalAction,
          }),
        }
      );

      const addMatchToUserJson = await addMatchToUser.json();
      if (addMatchToUserJson.action) {
        props.onAdd();
      }
    } catch (err: any) {
      console.log("error");
    }
  };

  const handleSwipe = async (d: any) => {
    if (d === "left") {
      await matchActions(props.userData?._id, "reject");
    }
    if (d === "right") {
      await matchActions(props.userData?._id, "match");
    }
    if (d === "down") {
      await matchActions(props.userData?._id, "reject");
    }
    if (d === "up") {
      await matchActions(props.userData?._id, "match");
    }
  };

  return (
    <CardSwiper
      onSwipe={handleSwipe}
      className={"rightPane__mainCard__swiper"}
      contents={
        <div className={"rightPane__mainCard"}>
          <div className={"rightPane__mainCard__profilePicture"}>
            <img src={profilePicture} alt={"profilePicture"} />
          </div>
          <div className={"rightPane__mainCard__details"}>
            <div className={"rightPane__mainCard__nameAge"}>
              <p className={"rightPane__mainCard__nameAge__name"}>
                {props.userData?.name}
              </p>
              <p className={"rightPane__mainCard__nameAge__age"}>
                {props.userData?.age}
              </p>
            </div>
            <div className={"rightPane__mainCard__designation"}>
              <p>{props.userData?.designation}</p>
              <p>Experience - {props.userData?.experience} years</p>
            </div>
            <div className={"rightPane__mainCard__skills"}>
              <p>Primary Skills</p>
              <ul>
                {props.skills?.map((skill: any[]) =>
                  skill.map((skillInd, index) => (
                    <li key={index === 0 ? index + 13 : index * 3456}>
                      <p>{skillInd}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
            {props.actions && (
              <div className={"rightPane__mainCard__reactions"}>
                <img
                  src={reject}
                  alt={"reject"}
                  onClick={() => matchActions(props.userData?._id, "reject")}
                />
                <img src={showPrevious} alt={"previous"} />
                <img
                  src={favorite}
                  alt={"favorite"}
                  onClick={() => matchActions(props.userData?._id, "favorite")}
                />
                <img
                  src={match}
                  alt={"match"}
                  onClick={() => matchActions(props.userData?._id, "match")}
                />
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default RightPaneCardMain;
