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
import RightPaneCardDevInfo from "../MatchMaker/RightPaneCards/RightPaneCardDevInfo";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData]: any = useState({});
  const [availabilityData, setAvailabilityData]: any = useState([]);
  const [discoveryData, setDiscoveryData]: any = useState([]);
  const [rightCardDevInfo, setRightCardDevInfo]: any = useState([]);

  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    const user = await fetch("http://localhost:8080/profile/" + userId);
    const userData = await user.json();
    const { email, phoneNumber, location, remoteAvailability } = userData.user;
    const { lookingFor, experienceLevel, matchRadius } = userData.user;
    const { links, summary } = userData.user;

    const availableDataArray = [];
    availableDataArray.push(
      { "E-mail": email },
      { Phone: phoneNumber },
      { Location: location },
      { "Remote Availability": remoteAvailability === true ? "Yes" : "No" }
    );
    const discoveryDataArray = [];
    discoveryDataArray.push(
      { "Looking For": lookingFor },
      { Experience: experienceLevel },
      { Radius: matchRadius }
    );
    const rightCardDevInfoArray = [];

    rightCardDevInfoArray.push(
      { Github: links?.github },
      { LinkedIn: links?.linkedIn },
      { Portfolio: links?.portfolio },
      { Summary: summary }
    );
    setAvailabilityData(availableDataArray);
    setDiscoveryData(discoveryDataArray);
    setRightCardDevInfo(rightCardDevInfoArray);
    setUserData(userData.user as user);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logoutHandler = () => {
    dispatch(setAuthLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className={"profile__mainContainer"}>
      <div className={"matchmaker__leftPane"}>
        <div className={"matchmaker__leftPane__nav profile__leftPane__nav"}>
          <div className={"profile__leftPane__nav__partOne"}>
            <div className={"matchmaker__leftPane__nav__profile"}>
              <img src={profilePicture} alt={"ProfilePicture"} />
              <p>{userData?.name?.split(" ")[0].trim()}</p>
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
            {availabilityData?.map((data: object, index: number) => (
              <div
                className={"profile__leftPane__settings__account__option"}
                key={index === 0 ? index + 13 : index * 3456}
              >
                <p>{Object.keys(data)}</p>
                <p className={"profile__leftPane__settings__account__content"}>
                  {Object.values(data)}
                </p>
              </div>
            ))}
          </div>
          <div className={"profile__leftPane__settings__discovery__container"}>
            <div className={"profile__leftPane__settings__discovery"}>
              <p>Discovery Settings</p>
            </div>
            {discoveryData?.map((data: object, index: number) => (
              <div
                className={"profile__leftPane__settings__account__option"}
                key={index === 0 ? index + 13 : index * 3456}
              >
                <p>{Object.keys(data)}</p>
                <p className={"profile__leftPane__settings__account__content"}>
                  {Object.values(data)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={"profile__leftPane__actions"}>
          <Button title={"Logout"} onClick={logoutHandler} danger={false} />
          <Button title={"Delete"} danger={true} />
        </div>
      </div>
      <div className={"profile__rightPane"}>
        <div className={"profile__rightPane__cards"}>
          <RightPaneCardMain actions={false} userData={userData} />
          <RightPaneCardDevInfo data={rightCardDevInfo} />
        </div>
        <div className={"profile__rightPane__button"}>
          <Button title={"Edit Info"} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
