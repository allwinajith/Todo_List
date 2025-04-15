import React from "react";
import { FaPersonShelter } from "react-icons/fa6";
import { PiBuildingOfficeBold } from "react-icons/pi";

const MainContent = () => {
  return (
    <div className="mainContentContainer">
      <div className="contentToggleBtn">
        <div className="personalContainer">
          <FaPersonShelter />
          <div>Personal</div>
        </div>
        <div className="professionalContainer">
          <PiBuildingOfficeBold />
          <div>Professional</div>
        </div>
      </div>
      <div className="toggleLine"></div>
      <div className="todoContent">
        <h1>This is the Container for Main</h1>
        <p>
          This is the thing I make a
          adsfffffffffffffadsfffffffffffffffffffffffffffffffffffffffffffffffffff
          Great question! Since you already have components named Header and
          Footer, your content area typically represents the main body of your
          page. Here are some good naming options depending on how you want to
          structure it:
        </p>
      </div>
    </div>
  );
};

export default MainContent;
