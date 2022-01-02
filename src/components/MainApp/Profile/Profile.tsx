import React from "react";
import "./Profile.css";
// @ts-ignore
import profilePicture from "../../../Ellipse 1.svg";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  return (
    <div className={"profile__mainContainer"}>
      <div className={"matchmaker__leftPane"}>
        <div className={"matchmaker__leftPane__nav profile__leftPane__nav"}>
          <div className={"profile__leftPane__nav__partOne"}>
            <div className={"matchmaker__leftPane__nav__profile"}>
              <img src={profilePicture} alt={"ProfilePicture"} />
              <p>Lucifer</p>
            </div>
          </div>
          <div className={"profile__leftPane__nav__partTwo"}>
            <Link to={"/app/matchmaker"}>
              <button className={"profile__leftPane__nav__partTwo__button"}>
                {"<match/>"}
              </button>
            </Link>
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
          <Link to={"/"} className={"profile__leftPane__actions__logout"}>
            Logout
          </Link>
          <Link to={"/"} className={"profile__leftPane__actions__delete"}>
            Delete Account
          </Link>
        </div>
      </div>
      <div className={"matchmaker__rightPane"}>Right</div>
    </div>
  );
};

export default Profile;
