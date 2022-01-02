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

const RightPaneCardMain: React.FC = () => {
  const skills = ["Java", "JavaScript", "React", "Html/Css", "Next", "NodeJS"];
  return (
    <div className={"rightPane__mainCard"}>
      <div className={"rightPane__mainCard__profilePicture"}>
        <img src={profilePicture} alt={"profilePicture"} />
      </div>
      <div className={"rightPane__mainCard__details"}>
        <div className={"rightPane__mainCard__nameAge"}>
          <p className={"rightPane__mainCard__nameAge__name"}>
            Lucifer madmaxfuryon
          </p>
          <p className={"rightPane__mainCard__nameAge__age"}>30</p>
        </div>
        <div className={"rightPane__mainCard__designation"}>
          <p>Senior Software Developer</p>
          <p>Experience: 6 years</p>
        </div>
        <div className={"rightPane__mainCard__skills"}>
          <p>Primary Skills</p>
          <ul>
            {skills.map((skill) => (
              <li>
                <p>{skill}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={"rightPane__mainCard__reactions"}>
          <img src={reject} alt={"reject"} />
          <img src={showPrevious} alt={"previous"} />
          <img src={favorite} alt={"favorite"} />
          <img src={match} alt={"match"} />
        </div>
      </div>
    </div>
  );
};

export default RightPaneCardMain;
