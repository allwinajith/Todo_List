import React, { useState, useEffect } from "react";
import "../src/App.css";
import { FaPersonShelter } from "react-icons/fa6";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { VscClearAll } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";

const MainContent = () => {
  const [activeLink, setActiveLink] = useState("personal");
  const [inputValue, setInputValue] = useState("");
  const [todoData, setTodoData] = useState(() => {
    const savedData = localStorage.getItem("todoData");
    return savedData
      ? JSON.parse(savedData)
      : {
          personal: [],
          professional: [],
        };
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
    if (e.key === "Enter") {
      handleAddData();
    }
  };

  const handleCheck = (id) => {
    setTodoData((prev) => ({
      ...prev,
      [activeLink]: prev[activeLink].map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      ),
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodoData((prev) => ({
        ...prev,
        [activeLink]: prev[activeLink].filter((item) => item.id !== id),
      }));
    }
    // localStorage.setItem("todoData", JSON.stringify(newData));
    // return newData;
  };

  const handleClearCompleted = () => {
    if (window.confirm("Are you sure you want to clear all completed tasks?")) {
      setTodoData((prev) => ({
        ...prev,
        [activeLink]: prev[activeLink].filter((item) => !item.isCompleted),
      }));
    }
  };

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);

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
              {todoData[activeLink].length != 0 ? (
                <DisplayData
                  toggleCheck={handleCheck}
                  data={todoData[activeLink]}
                  handleDel={handleDelete}
                />
              ) : (
                <div className="defaultText"> Please Add Some Task </div>
              )}
            </div>
            <button
              className="clearContainer"
              onClick={handleClearCompleted}
              disabled={!todoData[activeLink].some((item) => item.isCompleted)}
            >
              <VscClearAll color="rgb(225 127 21)" fontSize={20} />
              <span>Clear Completed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DisplayData = ({ data, toggleCheck, handleDel }) => {
  return (
    <ul className="dataList">
      {data.map((item, ind) => (
        <li key={ind} className={`todoItem ${item.isCompleted ? "done" : ""}`}>
          <input
            type="checkbox"
            onChange={() => toggleCheck(item.id)}
            checked={item.isCompleted}
            className="todoCheckbox"
          />
          <span className="taskText">{item.task}</span>
          <MdDelete onClick={() => handleDel(item.id)} className="deleteIcon" />
        </li>
      ))}
    </ul>
  );
};

export default MainContent;
