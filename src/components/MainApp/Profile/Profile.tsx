import React, { useEffect, useState } from "react";
import "./Profile.css";
// @ts-ignore
import profilePicture from "../../../Ellipse 1.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthLogout } from "../../../store/userSlice";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import RightPaneCardMain from "../MatchMaker/RightPaneCards/RightPaneCardMain";
import { user } from "../MatchMaker/RightPaneCards/RightPaneCardMain";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    const user = await fetch("http://localhost:8080/profile/" + userId);
    const userData = await user.json();
    setUserData(userData.user as user);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logoutHandler = () => {
    dispatch(setAuthLogout());
    localStorage.removeItem("token");
    navigate("/");
  };

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
                {/*// @ts-ignore*/}
                {userData?.email}
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
          <Button title={"Logout"} onClick={logoutHandler} />
          <Button title={"Delete"} danger={true} />
        </div>
      </div>
      <div className={"matchmaker__rightPane"}>
        <RightPaneCardMain actions={false} userData={userData} />
      </div>
    </div>
  );
};

export default Profile;
