import React, { useState } from "react";
import "../src/App.css";
import { FaPersonShelter } from "react-icons/fa6";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { VscClearAll } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";

const MainContent = () => {
  const [activeLink, setActiveLink] = useState("personal");
  const [inputValue, setInputValue] = useState("");
  const [todoData, setTodoData] = useState({
    personal: [
      {
        id: 1,
        task: "This is the sample task ",
        isCompleted: false,
      },
    ],
    professional: [
      { id: 1, task: "This is the sample task", isCompleted: true },
    ],
  });

  const handleAddData = () => {
    if (inputValue.trim() === "") return;
    const newTask = {
      id: Date.now(),
      task: inputValue,
      isCompleted: false,
    };
    setTodoData((prev) => ({
      ...prev,
      [activeLink]: [...prev[activeLink], newTask],
    }));
    setInputValue("");
  };

  const handleKeyAdd = (e) => {
    if (e.key === 'Enter'){
      handleAddData();
    }
  };

  return (
    <div className="mainContentContainer">
      <div className="contentToggleBtn">
        <div
          onClick={() => setActiveLink("personal")}
          className={`personalContainer ${
            activeLink == "personal" ? "active" : ""
          } `}
        >
          <FaPersonShelter />
          <div>Personal</div>
        </div>
        <div
          onClick={() => setActiveLink("professional")}
          className={`professionalContainer ${
            activeLink == "professional" ? "active" : ""
          } `}
        >
          <PiBuildingOfficeBold />
          <div>Professional</div>
        </div>
      </div>
      <div className="displayTodoContainer">
        <div className="todoContent">
          {/* {activeLink == "Personal" ? personalToDo : professsionalToDo} */}
          <div className="addItemBox">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyAdd}
              placeholder="What do you need to do ?"
            />
            <input type="button" value="ADD" onClick={handleAddData} />
          </div>
          <div className="dataBox">
            <div className="scrollableContent">
              <DisplayData data={todoData[activeLink]} />
            </div>
            <button className="clearContainer">
              <VscClearAll color="rgb(225 127 21)" fontSize={20} />
              <span>Clear Completed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DisplayData = ({ data }) => {
  return (
    <ul className="dataList">
      {data.map((item, ind) => (
        <li key={ind} className={`todoItem ${item.isCompleted ? "done" : ""}`}>
          <input
            type="checkbox"
            onClick={(prev)=>item.isCompleted = !prev}
            defaultChecked={item.isCompleted}
            className="todoCheckbox"
          />
          <span className="taskText">{item.task}</span>
          <MdDelete className="deleteIcon" />
        </li>
      ))}
    </ul>
  );
};

export default MainContent;
