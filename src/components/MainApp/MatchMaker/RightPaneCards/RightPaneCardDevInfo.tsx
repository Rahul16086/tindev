import React from "react";
import "./RightPaneCardDevInfo.css";

const RightPaneCardDevInfo: React.FC = () => {
  const infos = [
    { title: "Github", content: "https://github.com/luci001" },
    {
      title: "Portfolio",
      content: "https://lucifolio.com/",
    },
    {
      title: "LinkedIn",
      content: "https://linkedin.com/theDevLucissdsdsdsdsdds",
    },
    {
      title: "Summary",
      content:
        "I’m in the process of developing \n" +
        "a full-stack app. Connect with me\n" +
        "to learn new things especially\n" +
        "in the world of modern coding \n" +
        "and programming. ",
    },
    { title: "Remote Availability", content: "Yes" },
  ];
  return (
    <div className={"rightPane__mainCard"}>
      <div className={"rightPane__devInfo"}>
        {infos.map((info) => (
          <div>
            <p className={"rightPane__devInfo__title"}>{info.title}</p>
            <p className={"rightPane__devInfo__content"}>{info.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPaneCardDevInfo;
