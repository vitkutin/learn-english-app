import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";

export default function Mod() {
  //Clears textfield after input
  const initialValues = {
    finnish: "",
    english: "",
  };

  const [input, setInput] = useState(initialValues);

  let [list, setList] = useState([]);

  //Show exercises
  useEffect(() => {
    fetch(`http://localhost:8080/vocabulary/`)
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  //Updates input state
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  //Creates new list item and updates list on submit
  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      in_finnish: input.finnish,
      in_english: input.english,
    };
    setList([...list, newItem]);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };
    fetch("http://localhost:8080/vocabulary/", options).then((res) =>
      console.log(res)
    );
  }

  //Edits task description and adds modified task to the end of the list
  function handleEdit(e) {
    let edited = window.prompt("Edit description");
    let editedItem = {
      id: uuidv4(),
      description: edited,
      date: e.date,
      tag: e.tag,
    };
    const newList = list.filter((el) => el.id !== e.id);
    setList([...newList, editedItem]);
  }

  //Filters element from list by comparing id's
  function handleDelete(e) {
    fetch(`http://localhost:8080/vocabulary/` + e.id, {
      method: "delete",
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .then(() => setList(list.filter((el) => el.id !== e.id)));
  }

  return (
    <div>
      <h1>EXERCISES</h1>
      {/* Forms for date, description and tag */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            id="fi-mod"
            name="finnish"
            value={input.finnish}
            onChange={handleInputChange}
            placeholder="In finnish"
          />
          <input
            id="en-mod"
            name="english"
            value={input.english}
            onChange={handleInputChange}
            placeholder="In english"
          />
          <button id="submit-mod" type="submit">
            Add exercise
          </button>
        </form>
      </div>

      {/* List */}
      <div className="item-list-mod">
        {list.map((e) => (
          <div className="item-container">
            {/* Elements */}
            <div>
              <span id="span-desc">
                {" "}
                {e.in_finnish} {" = "}{" "}
              </span>
              <span id="span-date"> {e.in_english} </span>
              <span id="buttons">
                {/* DELETE BUTTON */}
                <button id="taskBtn">
                  <FaRegTrashAlt onClick={() => handleDelete(e)} />
                </button>
                {/* EDIT BUTTON */}
                <button id="taskBtn">
                  <FaEdit onClick={() => handleEdit(e)} />
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
