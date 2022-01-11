import React from "react";
import "./RightPaneCardMain.css";
// @ts-ignore
import profilePicture from "../../../../Ellipse 1.svg";
// @ts-ignore
import reject from "../../../../Reactions/Reject.svg";
// @ts-ignore
import showPrevious from "../../../../Reactions/Show Previous.svg";
// @ts-ignore
import favorite from "../../../../Reactions/Favorite.svg";
// @ts-ignore
import match from "../../../../Reactions/Match.svg";

export type user = {
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
const RightPaneCardMain: React.FC<{ actions: boolean; userData?: user }> = (
  props
) => {
  return (
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
          <p>{props.userData?.experience}</p>
        </div>
        <div className={"rightPane__mainCard__skills"}>
          <p>Primary Skills</p>
          <ul>
            {props.userData?.skills?.map((skill: any[]) =>
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
            <img src={reject} alt={"reject"} />
            <img src={showPrevious} alt={"previous"} />
            <img src={favorite} alt={"favorite"} />
            <img src={match} alt={"match"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPaneCardMain;
