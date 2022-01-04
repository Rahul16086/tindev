import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const SignUpTwo: React.FC = () => {
  const locationRef = useRef() as React.RefObject<any>;
  const lookingForRef = useRef() as React.RefObject<any>;
  const remoteAvailabilityRef = useRef() as React.RefObject<any>;
  const experienceLevelRef = useRef() as React.RefObject<any>;
  const matchRadiusRef = useRef() as React.RefObject<any>;
  const githubRef = useRef() as React.RefObject<any>;
  const portfolioRef = useRef() as React.RefObject<any>;
  const linkedInRef = useRef() as React.RefObject<any>;
  const summaryRef = useRef() as React.RefObject<any>;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signUpTwoHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const location = locationRef.current.value;
      const lookingFor = lookingForRef.current.value;
      const remoteAvailability = remoteAvailabilityRef.current.value;
      const experienceLevel = experienceLevelRef.current.value;
      const matchRadius = matchRadiusRef.current.value;
      const github = githubRef.current.value;
      const portfolio = portfolioRef.current.value;
      const linkedIn = linkedInRef.current.value;
      const summary = summaryRef.current.value;
      const userId = localStorage.getItem("userId");

      const dbUserUpdate = await fetch("http://localhost:8080/auth/signupTwo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: location,
          remoteAvailability: remoteAvailability,
          lookingFor: lookingFor,
          experienceLevel: experienceLevel,
          matchRadius: matchRadius,
          github: github,
          portfolio: portfolio,
          linkedIn: linkedIn,
          summary: summary,
          userId: userId,
        }),
      });

      const result = await dbUserUpdate;

      if (result.status === 422) {
        throw new Error("Validation failed");
      }
      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Creating a user failed!");
      }
      const resultJson = await result.json();

      if (resultJson.userId.message) {
        navigate("/app/matchmaker");
      }
    } catch (e: any) {
      setError(e && "Error occurred, Please check the values entered");
    }
  };

  const errorCleaner = () => {
    setError("");
  };

  return (
    <div className={"signup__mainContainer"} onClick={errorCleaner}>
      <form className={"signup__form"} onSubmit={signUpTwoHandler}>
        {error && (
          <div className={"signup__form__error"}>
            <p>{error.toString()}</p>
          </div>
        )}
        <div className={"signup__form__location"}>
          <label>Location</label>
          <input type={"text"} placeholder={"Enter City"} ref={locationRef} />
        </div>
        <div className={"signup__form__lookingFor"}>
          <label>Looking For</label>
          <select ref={lookingForRef}>
            <option value={"front-end"}>Front-End Dev</option>
            <option value={"back-end"}>Back-End Dev</option>
            <option value={"full-stack"}>Full-Stack Dev</option>
            <option value={"does"}>Does Programming</option>
          </select>
        </div>
        <div className={"signup__form__remote"}>
          <label>Remote Availability</label>
          <select ref={remoteAvailabilityRef}>
            <option value={"yes"}>Yes</option>
            <option value={"no"}>No</option>
          </select>
        </div>
        <div className={"signup__form__experience"}>
          <label>Experience Level</label>
          <select ref={experienceLevelRef}>
            <option>Graduates</option>
            <option>Low (1-2y)</option>
            <option>Medium (2-5y)</option>
            <option>High (5y +)</option>
          </select>
        </div>
        <div className={"signup__form__radius"}>
          <label>Match Radius (miles)</label>
          <input type={"number"} ref={matchRadiusRef} />
        </div>
        <div className={"signup__form__github"}>
          <label>GitHub</label>
          <input type={"url"} ref={githubRef} />
        </div>
        <div className={"signup__form__portfolio"}>
          <label>Portfolio</label>
          <input type={"url"} ref={portfolioRef} />
        </div>
        <div className={"signup__form__linkedin"}>
          <label>LinkedIn</label>
          <input type={"url"} ref={linkedInRef} />
        </div>
        <div className={"signup__form__summary"}>
          <label>Summary</label>
          <textarea
            placeholder={"A short summary, about 30 words"}
            ref={summaryRef}
          />
        </div>
        <div className={"signup__form__submit"}>
          <Button title={"Save"} type={"submit"} />
        </div>
      </form>
    </div>
  );
};

export default SignUpTwo;
