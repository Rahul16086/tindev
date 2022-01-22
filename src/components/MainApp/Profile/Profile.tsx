import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import profilePicture from "../../../images/Ellipse 1.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthLogout } from "../../../store/userSlice";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import RightPaneCardMain from "../MatchMaker/RightPaneCards/RightPaneCardMain";
import { user } from "../MatchMaker/RightPaneCards/RightPaneCardMain";
import RightPaneCardDevInfo from "../MatchMaker/RightPaneCards/RightPaneCardDevInfo";
import ProfileEditInfo from "./ProfileEditInfo";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData]: any = useState({});
  const [availabilityData, setAvailabilityData]: any = useState([]);
  const [discoveryData, setDiscoveryData]: any = useState([]);
  const [rightCardDevInfo, setRightCardDevInfo]: any = useState([]);
  const [editToggle, setEditToggle] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [editInfoToggle, setEditInfoToggle] = useState(false);
  const [settingsActiveState, setSettingsActiveState]: any = useState(true);
  const [favoritesActiveState, setFavoritesActiveState]: any = useState(false);
  const [favorites, setFavorites]: any = useState(null);
  const lookingForRef = useRef() as React.RefObject<any>;
  const remoteAvailabilityRef = useRef() as React.RefObject<any>;
  const experienceLevelRef = useRef() as React.RefObject<any>;
  const emailRef = useRef() as React.RefObject<any>;
  const phoneRef = useRef() as React.RefObject<any>;
  const locationRef = useRef() as React.RefObject<any>;
  const matchRadiusRef = useRef() as React.RefObject<any>;
  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    const user = await fetch(
      "https://rtindev.herokuapp.com/profile/" + userId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const userData = await user.json();
    setFavorites(userData.favorites);
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
  }, [updated]);

  const logoutHandler = () => {
    dispatch(setAuthLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const editToggler = () => {
    setEditToggle(() => !editToggle);
  };

  const updateSettings = async () => {
    const newEmail = emailRef.current.value;
    const newPhone = phoneRef.current.value;
    const newLocation = locationRef.current.value;
    const newRemoteAvailability = remoteAvailabilityRef.current.value;
    const newLookingFor = lookingForRef.current.value;
    const newExperienceLevel = experienceLevelRef.current.value;
    const newMatchRadius = matchRadiusRef.current.value;

    const userId = localStorage.getItem("userId");
    const updateData = await fetch(
      "http://localhost:8080/profile/" + userId + "/settingsUpdate",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          location: newLocation,
          remoteAvailability: newRemoteAvailability,
          lookingFor: newLookingFor,
          experienceLevel: newExperienceLevel,
          matchRadius: newMatchRadius,
          phoneNumber: newPhone,
          email: newEmail,
        }),
      }
    );
    const updateDataResult = await updateData.json();
    if (updateDataResult.message) {
      setEditToggle(() => !editToggle);
      setUpdated(() => !updated);
    }
  };

  const editInfoToggler = (value: boolean) => {
    setEditInfoToggle(() => !editInfoToggle);
    if (value) {
      setUpdated(() => !updated);
    }
  };

  const matchesActiveToggle = () => {
    setSettingsActiveState(() => !settingsActiveState);
    setFavoritesActiveState(false);
  };
  const messagesActiveToggle = () => {
    setFavoritesActiveState(() => !favoritesActiveState);
    setSettingsActiveState(false);
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
                {"<Match/>"}
              </button>
            </Link>
          </div>
        </div>
        <div className={"profile__leftPane__settings"}>
          <div className={"matchmaker__leftPane__options"}>
            <p
              className={settingsActiveState ? "active" : ""}
              onClick={matchesActiveToggle}
            >
              Settings
            </p>
            <p
              className={favoritesActiveState ? "active" : ""}
              onClick={messagesActiveToggle}
            >
              Favorites
            </p>
          </div>
          {settingsActiveState && (
            <>
              <div
                className={"profile__leftPane__settings__account__container"}
              >
                <div className={"profile__leftPane__settings__account"}>
                  <p>Account Settings</p>
                  <button onClick={editToggler}>
                    {editToggle ? "Cancel" : "Edit"}
                  </button>
                  {editToggle && (
                    <button onClick={updateSettings}>Update</button>
                  )}
                </div>
                {!editToggle &&
                  availabilityData?.map((data: object, index: number) => (
                    <div
                      className={"profile__leftPane__settings__account__option"}
                      key={index === 0 ? index + 13 : index * 3456}
                    >
                      <p>{Object.keys(data)}</p>
                      <p
                        className={
                          "profile__leftPane__settings__account__content"
                        }
                      >
                        {Object.values(data)}
                      </p>
                    </div>
                  ))}
                {editToggle && (
                  <>
                    <div
                      className={"profile__leftPane__settings__account__option"}
                    >
                      <label>E-mail</label>
                      <input
                        type={"email"}
                        defaultValue={userData.email}
                        className={
                          "profile__leftPane__settings__account__content"
                        }
                        ref={emailRef}
                      />
                    </div>
                    <div
                      className={"profile__leftPane__settings__account__option"}
                    >
                      <label>Phone</label>
                      <input
                        type={"text"}
                        defaultValue={userData.phoneNumber}
                        className={
                          "profile__leftPane__settings__account__content"
                        }
                        ref={phoneRef}
                      />
                    </div>
                    <div
                      className={"profile__leftPane__settings__account__option"}
                    >
                      <label>Location</label>
                      <input
                        type={"text"}
                        defaultValue={userData.location}
                        className={
                          "profile__leftPane__settings__account__content"
                        }
                        ref={locationRef}
                      />
                    </div>
                    <div
                      className={"profile__leftPane__settings__account__option"}
                    >
                      <label>Remote Availability</label>
                      <select ref={remoteAvailabilityRef}>
                        <option value={"yes"}>Yes</option>
                        <option value={"no"}>No</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
              <div
                className={"profile__leftPane__settings__discovery__container"}
              >
                <div className={"profile__leftPane__settings__discovery"}>
                  <p>Discovery Settings</p>
                </div>
                {!editToggle &&
                  discoveryData?.map((data: object, index: number) => (
                    <div
                      className={"profile__leftPane__settings__account__option"}
                      key={index === 0 ? index + 13 : index * 3456}
                    >
                      <p>{Object.keys(data)}</p>
                      <p
                        className={
                          "profile__leftPane__settings__account__content"
                        }
                      >
                        {Object.values(data)}
                      </p>
                    </div>
                  ))}
                {editToggle && (
                  <>
                    <div
                      className={"profile__leftPane__settings__account__option"}
                    >
                      <label>Looking for</label>
                      <select ref={lookingForRef}>
                        <option>Front-End Dev</option>
                        <option>Back-End Dev</option>
                        <option>Full-Stack Dev</option>
                        <option>Does Programming</option>
                      </select>
                    </div>
                    <div
                      className={"profile__leftPane__settings__account__option"}
                    >
                      <label>Experience Level</label>
                      <select ref={experienceLevelRef}>
                        <option>Graduates</option>
                        <option>Low (1-2y)</option>
                        <option>Medium (2-5y)</option>
                        <option>High (5y +)</option>
                      </select>
                    </div>
                    <div
                      className={"profile__leftPane__settings__account__option"}
                    >
                      <label>Radius</label>
                      <input
                        type={"number"}
                        defaultValue={userData.matchRadius}
                        className={
                          "profile__leftPane__settings__account__content"
                        }
                        ref={matchRadiusRef}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          {favoritesActiveState &&
            (favorites.length > 0 ? (
              <>
                {favorites.map((favorite: any) => (
                  <div
                    key={Math.random()}
                    className={
                      "matchmaker__leftPane__content__matches__individual"
                    }
                  >
                    <img src={profilePicture} alt={"luci"} />
                    <p>{favorite.name}</p>
                  </div>
                ))}
              </>
            ) : (
              <div className={"matchmaker__leftPane__favorites"}>
                <p>No Favorites yet :(</p>
              </div>
            ))}
        </div>
        <div className={"profile__leftPane__actions"}>
          <Button title={"Logout"} onClick={logoutHandler} danger={false} />
          <Button title={"Delete"} danger={true} />
        </div>
      </div>
      <div className={"profile__rightPane"}>
        {!editInfoToggle && (
          <div className={"profile__rightPane__cards"}>
            <RightPaneCardMain
              actions={false}
              userData={userData}
              skills={userData.skills}
            />
            <RightPaneCardDevInfo data={rightCardDevInfo} />
          </div>
        )}
        {editInfoToggle && (
          <div className={"profile__rightPane__cards"}>
            <ProfileEditInfo
              userData={userData}
              toggle={() => editInfoToggler(true)}
            />
          </div>
        )}
        <div className={"profile__rightPane__button"}>
          <Button
            title={editInfoToggle ? "Cancel" : "Edit Info"}
            onClick={() => {
              editInfoToggler(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
