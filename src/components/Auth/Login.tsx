import React from "react";
import "./Login.css";
import Button from "../Button/Button";

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
          <Button title={"Login"} />
        </div>
      </form>
    </div>
  );
};

export default Login;
