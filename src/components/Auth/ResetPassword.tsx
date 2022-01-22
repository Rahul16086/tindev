import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import { Link, useParams } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const params = useParams();
  const passwordRef = useRef() as React.RefObject<any>;
  const [passwordChanged, setPasswordChanged] = useState(false);

  const onChangeClicked = async (event: React.FormEvent) => {
    const password = passwordRef.current.value;
    event.preventDefault();

    try {
      const dbResetPassword = await fetch(
        "https://rtindev.herokuapp.com/auth/resetPassword/" + params.resetToken,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      );
      const result = await dbResetPassword.json();
      console.log(result);
      if (result.success) {
        setPasswordChanged(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"signup__mainContainer"}>
      <form className={"login__form"}>
        {!passwordChanged && (
          <>
            <p>Reset Password</p>
            <div className={"login__form__email"}>
              <label>New Password</label>
              <input type={"password"} />
            </div>
            <div className={"login__form__email"}>
              <label>Confirm Password</label>
              <input type={"password"} ref={passwordRef} required />
            </div>
            <div className={"login__form__login"}>
              <Button title={"Change"} onClick={onChangeClicked} />
            </div>
          </>
        )}
        {passwordChanged && (
          <>
            <p>Password changed successfully</p>
            <div className={"login__form__login"}>
              <Link to={"/login"}>
                <Button title={"Login"} />
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
