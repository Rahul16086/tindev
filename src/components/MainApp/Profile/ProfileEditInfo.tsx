import React, { useRef } from "react";
import Button from "../../Button/Button";

const ProfileEditInfo: React.FC<{ userData: any; toggle?: any }> = (props) => {
  const githubRef = useRef() as React.RefObject<any>;
  const portfolioRef = useRef() as React.RefObject<any>;
  const linkedInRef = useRef() as React.RefObject<any>;
  const skillsRef = useRef() as React.RefObject<any>;
  const summaryRef = useRef() as React.RefObject<any>;
  const designationRef = useRef() as React.RefObject<any>;
  const experienceRef = useRef() as React.RefObject<any>;
  const nameRef = useRef() as React.RefObject<any>;
  const ageRef = useRef() as React.RefObject<any>;

  const updateInfo = async () => {
    const newName = nameRef.current.value;
    const newAge = ageRef.current.value;
    const newDesignation = designationRef.current.value;
    const newExperience = experienceRef.current.value;
    const newGithub = githubRef.current.value;
    const newPortfolio = portfolioRef.current.value;
    const newLinkedIn = linkedInRef.current.value;
    const newSkills = skillsRef.current.value;
    const newSummary = summaryRef.current.value;

    const userId = localStorage.getItem("userId");
    const updateInfo = await fetch(
      "http://localhost:8080/profile/" + userId + "/infoUpdate",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          age: newAge,
          designation: newDesignation,
          experience: newExperience,
          github: newGithub,
          portfolio: newPortfolio,
          linkedIn: newLinkedIn,
          skills: newSkills,
          summary: newSummary,
        }),
      }
    );
    const updateDataResult = await updateInfo.json();
    console.log(updateDataResult);
    if (updateDataResult.message) {
      props.toggle();
    }
  };
  return (
    <div className={"signup__form"}>
      <div className={"signup__form__nameAge"}>
        <div className={"signup__form__nameAge__name"}>
          <label>Name</label>
          <input
            type={"text"}
            ref={nameRef}
            required
            defaultValue={props.userData.name}
          />
        </div>
        <div className={"signup__form__nameAge__age"}>
          <label>Age</label>
          <input
            type={"number"}
            ref={ageRef}
            defaultValue={props.userData.age}
            required
          />
        </div>
      </div>
      <div className={"signup__form__location"}>
        <label>Designation</label>
        <input
          type={"text"}
          placeholder={"Like software developer..."}
          ref={designationRef}
          defaultValue={props.userData.designation}
        />
      </div>
      <div className={"signup__form__location"}>
        <label>Experience</label>
        <input
          type={"text"}
          placeholder={"Years"}
          ref={experienceRef}
          defaultValue={props.userData.experience}
        />
      </div>
      <div className={"signup__form__github"}>
        <label>GitHub</label>
        <input
          type={"url"}
          ref={githubRef}
          defaultValue={props.userData.links.github}
        />
      </div>
      <div className={"signup__form__portfolio"}>
        <label>Portfolio</label>
        <input
          type={"url"}
          ref={portfolioRef}
          defaultValue={props.userData.links.portfolio}
        />
      </div>
      <div className={"signup__form__linkedin"}>
        <label>LinkedIn</label>
        <input
          type={"url"}
          ref={linkedInRef}
          defaultValue={props.userData.links.linkedIn}
        />
      </div>
      <div className={"signup__form__summary"}>
        <label>Skills</label>
        <textarea
          placeholder={"Enter 6 skills separated by ' , '"}
          ref={skillsRef}
          defaultValue={props.userData.skills}
        />
      </div>
      <div className={"signup__form__summary"}>
        <label>Summary</label>
        <textarea
          placeholder={"A short summary, about 30 words"}
          ref={summaryRef}
          defaultValue={props.userData.summary}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button title={"Update"} onClick={updateInfo} />
      </div>
    </div>
  );
};

export default ProfileEditInfo;
