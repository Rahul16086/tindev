import React, { useRef, useState } from "react";
import "./Login.css";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/userSlice";

const Login = () => {
  const emailRef = useRef() as React.RefObject<any>;
  const passwordRef = useRef() as React.RefObject<any>;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const loginHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const email: string | undefined = emailRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;

    try {
      const dbLogin = await fetch("https://rtindev.herokuapp.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await dbLogin;

      let resultJson;

      if (result.status === 422) {
        throw new Error("Validation failed");
      }
      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Login failed!");
      }

      resultJson = await result.json();

      if (resultJson.token) {
        localStorage.setItem("token", resultJson.token);
        localStorage.setItem("userId", resultJson.userId);
        dispatch(setAuth({ token: resultJson.token }));
        navigate("/app/matchmaker");
      }
    } catch (e) {
      console.log(e);
      if (e) {
        setError("Invalid credentials");
      }
    }
  };

  const errorCleaner = () => {
    setError("");
  };

  return (
    <div className={"signup__mainContainer"} onClick={errorCleaner}>
      <form className={"login__form"} onSubmit={loginHandler}>
        {error && (
          <div className={"login__form__error"}>
            <p>{error.toString()}</p>
          </div>
        )}
        <div className={"login__form__email"}>
          <label>E-Mail</label>
          <input type={"email"} ref={emailRef} required />
        </div>
        <div className={"login__form__password"}>
          <label>Password</label>
          <input type={"password"} ref={passwordRef} required />
        </div>
        <div className={"login__form__login"}>
          <Button title={"Login"} type={"submit"} />
          <Link to={"/forgotPassword"}>Forgotten password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
