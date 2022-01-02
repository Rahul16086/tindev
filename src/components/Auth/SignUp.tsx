import React from "react";
import "./SignUp.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className={"signup__mainContainer"}>
      <form className={"signup__form"}>
        <div className={"signup__form__nameAge"}>
          <div className={"signup__form__nameAge__name"}>
            <label>Name</label>
            <input type={"text"} />
          </div>
          <div className={"signup__form__nameAge__age"}>
            <label>Age</label>
            <input type={"number"} />
          </div>
        </div>

        <div className={"signup__form__email"}>
          <label>E-Mail</label>
          <input type={"email"} />
        </div>
        <div className={"signup__form__phone"}>
          <label>Phone</label>
          <input type={"tel"} />
        </div>
        <div className={"signup__form__password__pass"}>
          <label>Password</label>
          <input type={"password"} />
        </div>
        <div className={"signup__form__password__confirmPass"}>
          <label>Confirm Password</label>
          <input type={"password"} />
        </div>
        <div className={"signup__form__submit"}>
          <Link to={"/signupTwo"}>
            <Button title={"Signup"} />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
