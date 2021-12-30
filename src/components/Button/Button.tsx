import React from "react";
import "./Button.css";

const Button = (props: any) => {
  return <button className={"button__common"}>{props.title}</button>;
};

export default Button;
