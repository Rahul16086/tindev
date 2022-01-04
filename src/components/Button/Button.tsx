import React from "react";
import "./Button.css";

const Button = (props: any) => {
  return (
    <button
      className={"button__common"}
      type={props.type}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default Button;
