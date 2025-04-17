import React, { useState } from "react";
import "../src/App.css";
import { FaPersonShelter } from "react-icons/fa6";
import { PiBuildingOfficeBold } from "react-icons/pi";

const MainContent = () => {
  const [activeLink, setActiveLink] = useState("Personal");
  const [personalToDo, setPersonalToDo] = useState(
    "This is the TODO Content for the personal container"
  );
  const [professsionalToDo, setProfessoionalToDo] = useState(
    "This is the TODO content for the Professional container "
  );

  return (
    <div className="mainContentContainer">
      <div className="contentToggleBtn">
        <div
          onClick={() => setActiveLink("Personal")}
          className={`personalContainer ${
            activeLink == "Personal" ? "active" : ""
          } `}
        >
          <FaPersonShelter />
          <div>Personal</div>
        </div>
        <div
          onClick={() => setActiveLink("Professional")}
          className={`professionalContainer ${
            activeLink == "Professional" ? "active" : ""
          } `}
        >
          <PiBuildingOfficeBold />
          <div>Professional</div>
        </div>
      </div>
      <div className="todoContent">
        {activeLink == "Personal" ? personalToDo : professsionalToDo}
      </div>
    </div>
  );
};

export default MainContent;
