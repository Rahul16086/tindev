import React from "react";
import Button from "../Button/Button";

const SignUpTwo: React.FC = () => {
  return (
    <div className={"signup__mainContainer"}>
      <form className={"signup__form"}>
        <div className={"signup__form__location"}>
          <label>Location</label>
          <input type={"text"} placeholder={"Enter City"} />
        </div>
        <div className={"signup__form__lookingFor"}>
          <label>Looking For</label>
          <select>
            <option value={"front-end"}>Front-End Dev</option>
            <option value={"back-end"}>Back-End Dev</option>
            <option value={"full-stack"}>Full-Stack Dev</option>
            <option value={"does"}>Does Programming</option>
          </select>
        </div>
        <div className={"signup__form__remote"}>
          <label>Remote Availability</label>
          <select>
            <option value={"yes"}>Yes</option>
            <option value={"no"}>No</option>
          </select>
        </div>
        <div className={"signup__form__experience"}>
          <label>Experience Level</label>
          <select>
            <option>Graduates</option>
            <option>Low (1-2y)</option>
            <option>Medium (2-5y)</option>
            <option>High (5y +)</option>
          </select>
        </div>
        <div className={"signup__form__radius"}>
          <label>Match Radius (miles)</label>
          <input type={"number"} />
        </div>
        <div className={"signup__form__github"}>
          <label>GitHub</label>
          <input type={"url"} />
        </div>
        <div className={"signup__form__portfolio"}>
          <label>Portfolio</label>
          <input type={"url"} />
        </div>
        <div className={"signup__form__linkedin"}>
          <label>LinkedIn</label>
          <input type={"url"} />
        </div>
        <div className={"signup__form__summary"}>
          <label>Summary</label>
          <textarea placeholder={"A short summary, about 30 words"} />
        </div>
        <div className={"signup__form__submit"}>
          <Button title={"Save"} />
        </div>
      </form>
    </div>
  );
};

export default SignUpTwo;
