import React from "react";
import "./Login.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={"signup__mainContainer"}>
      <form className={"login__form"}>
        <div className={"login__form__email"}>
          <label>E-Mail</label>
          <input type={"email"} required />
        </div>
        <div className={"login__form__password"}>
          <label>Password</label>
          <input type={"password"} required />
        </div>
        <div className={"login__form__login"}>
          <Link to={"/app/matchmaker"}>
            <Button title={"Login"} />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
