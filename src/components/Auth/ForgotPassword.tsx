import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const emailRef = useRef() as React.RefObject<any>;
  const [emailSent, setEmailSent] = useState(false);
  const forgotPassword = async (event: any) => {
    event.preventDefault();
    const email: string | undefined = emailRef.current?.value;
    try {
      const dbForgotPassword = await fetch(
        "https://rtindev.herokuapp.com/auth/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const result = await dbForgotPassword.json();
      console.log(result);
      if (result.message) {
        setEmailSent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={"signup__mainContainer"}>
      <form className={"login__form"} onSubmit={forgotPassword}>
        {!emailSent && (
          <>
            <p>Password Reset</p>
            <div className={"login__form__email"}>
              <label>E-Mail</label>
              <input type={"email"} ref={emailRef} required />
            </div>
            <div className={"login__form__login"}>
              <Button title={"Submit"} type={"submit"} />
            </div>
          </>
        )}
        {emailSent && (
          <>
            <p>
              E-Mail sent successfully, please use the link to Reset the
              Password
            </p>
            <div className={"login__form__login"}>
              <Link to={"/"}>
                <Button title={"Home"} />
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
