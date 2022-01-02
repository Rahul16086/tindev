import React from "react";
import "./Profile.css";
// @ts-ignore
import profilePicture from "../../../Ellipse 1.svg";

const Profile: React.FC = () => {
  return (
    <div className={"profile__mainContainer"}>
      <div className={"matchmaker__leftPane"}>
        <div className={"matchmaker__leftPane__nav profile__leftPane__nav"}>
          <div className={"profile__leftPane__nav__partOne"}>
            <img src={profilePicture} alt={"ProfilePicture"} />
            <p>Lucifer</p>
          </div>
          <div className={"profile__leftPane__nav__partTwo"}>
            <button>{"<Match/>"}</button>
          </div>
        </div>
        <div className={"profile__leftPane__settings"}>
          <div className={"profile__leftPane__settings__account__container"}>
            <div className={"profile__leftPane__settings__account"}>
              <p>Account Settings</p>
              <button>Edit</button>
            </div>
            <div className={"profile__leftPane__settings__account__option"}>
              <p>E-Mail</p>
              <p className={"profile__leftPane__settings__account__content"}>
                User-Email@here.com
              </p>
            </div>
          </div>
          <div className={"profile__leftPane__settings__discovery__container"}>
            <div className={"profile__leftPane__settings__discovery"}>
              <p>Discovery Settings</p>
            </div>
            <div className={"profile__leftPane__settings__account__option"}>
              <p>Looking For</p>
              <p className={"profile__leftPane__settings__account__content"}>
                Full-Stack Developer
              </p>
            </div>
          </div>
        </div>
        <div className={"profile__leftPane__actions"}>
          <div className={"profile__leftPane__actions__logout"}>Logout</div>
          <div className={"profile__leftPane__actions__delete"}>
            Delete Account
          </div>
        </div>
      </div>
      <div className={"matchmaker__rightPane"}>Right</div>
    </div>
  );
};

export default Profile;
