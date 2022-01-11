import React from "react";
import "./Button.css";

const Button: React.FC<{
  title: string;
  type?: string;
  onClick?: () => void;
  danger?: boolean;
}> = (props: any) => {
  let dangerStyle = "";
  if (props.danger) {
    dangerStyle =
      "linear-gradient(to right, #431212 0%, #c95a5a 51%, #431212 100%)";
  }

  return (
    <>
      <button
        className={"button__common"}
        type={props.type}
        onClick={props.onClick}
        style={{
          backgroundImage: dangerStyle,
        }}
      >
        {props.title}
      </button>
    </>
  );
};

export default Button;
