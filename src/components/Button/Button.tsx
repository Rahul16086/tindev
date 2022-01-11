import React from "react";
import "./Button.css";

const Button: React.FC<{
  title: string;
  type?: string;
  onClick?: () => void;
  danger?: boolean;
}> = (props: any) => {
  return (
    <>
      {props.danger ? (
        <button
          className={"button__common"}
          type={props.type}
          onClick={props.onClick}
          style={{
            backgroundImage:
              "linear-gradient(to right, #431212 0%, #c95a5a 51%, #431212 100%);",
          }}
        >
          {props.title}
        </button>
      ) : (
        <button
          className={"button__common"}
          type={props.type}
          onClick={props.onClick}
        >
          {props.title}
        </button>
      )}
    </>
  );
};

export default Button;
