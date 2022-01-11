import React from "react";
import "./RightPaneCardDevInfo.css";

const RightPaneCardDevInfo: React.FC<{ data: any }> = (props) => {
  console.log("RightDtaa", props.data);
  return (
    <div className={"rightPane__mainCard"}>
      <div className={"rightPane__devInfo"}>
        {props.data.map((info: any, index: number) => (
          <div key={index === 0 ? index + 13 : index * 3456}>
            <p className={"rightPane__devInfo__title"}>{Object.keys(info)}</p>
            <p className={"rightPane__devInfo__content"}>
              {Object.values(info).toString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPaneCardDevInfo;
