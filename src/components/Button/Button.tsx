import React from "react";
import "./Button.css";

const Button = (props: any) => {
  return (
    <button className={"button__common"} type={props.type}>
      {props.title}
    </button>
  );
};

export default Button;
