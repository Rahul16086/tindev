import React, { useRef, useState } from "react";
import "./SignUp.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import IsAuth from "../../customHooks/isAuthHook";

const SignUp: React.FC = () => {
  const nameRef = useRef() as React.RefObject<any>;
  const ageRef = useRef() as React.RefObject<any>;
  const emailRef = useRef() as React.RefObject<any>;
  const phoneRef = useRef() as React.RefObject<any>;
  const passwordRef = useRef() as React.RefObject<any>;
  const confirmPasswordRef = useRef() as React.RefObject<any>;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signUpHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const name: string | undefined = nameRef.current?.value;
    const age: string | undefined = ageRef.current?.value;
    const email: string | undefined = emailRef.current?.value;
    const phone: string | undefined = phoneRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;
    const confirmPassword: string | undefined =
      confirmPasswordRef.current?.value;

    try {
      if (password !== confirmPassword) {
        setError("Passwords doesn't match!");
        return;
      }
      const dbSignup = await fetch(
        "https://rtindev.herokuapp.com/auth/signup",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            age: age,
            phoneNumber: phone,
          }),
        }
      );

      const result = await dbSignup;

      let resultJson;

      if (result.status === 422) {
        throw new Error("Validation failed");
      }
      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Creating a user failed!");
      }
      resultJson = await result.json();
      console.log(resultJson);
      if (resultJson.userId) {
        localStorage.setItem("userId", resultJson.userId);
        navigate("/signupTwo");
      }
    } catch (err: any) {
      console.log(err);
      setError(err);
    }
  };

  const errorCleaner = () => {
    setError("");
  };

  IsAuth();

  return (
    <div className={"signup__mainContainer"} onClick={errorCleaner}>
      <form className={"signup__form"} onSubmit={signUpHandler}>
        {error && (
          <div className={"signup__form__error"}>
            <p>{error.toString()}</p>
          </div>
        )}
        <div className={"signup__form__nameAge"}>
          <div className={"signup__form__nameAge__name"}>
            <label>Name</label>
            <input type={"text"} ref={nameRef} required />
          </div>
          <div className={"signup__form__nameAge__age"}>
            <label>Age</label>
            <input type={"number"} ref={ageRef} required />
          </div>
        </div>

        <div className={"signup__form__email"}>
          <label>E-Mail</label>
          <input type={"email"} ref={emailRef} required />
        </div>
        <div className={"signup__form__phone"}>
          <label>Phone</label>
          <input type={"tel"} ref={phoneRef} />
        </div>
        <div className={"signup__form__password__pass"}>
          <label>Password</label>
          <input type={"password"} ref={passwordRef} required />
        </div>
        <div className={"signup__form__password__confirmPass"}>
          <label>Confirm Password</label>
          <input type={"password"} ref={confirmPasswordRef} required />
        </div>
        <div className={"signup__form__submit"}>
          <Button title={"Signup"} type={"submit"} />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
