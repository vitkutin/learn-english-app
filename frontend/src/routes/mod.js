import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";

export default function Mod() {
  let [list, setList] = useState([]);

  // Clear textfield after input
  const initialValues = {
    finnish: "",
    english: "",
  };

  const [input, setInput] = useState(initialValues);

  // Fetch all exercises from database
  useEffect(() => {
    fetch(`/vocabulary`)
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  // Update input state
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  // Create new exercise from input and add to the list
  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      in_finnish: input.finnish,
      in_english: input.english,
    };
    setList([...list, newItem]);
    // Send exercise to database
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };
    fetch("/vocabulary/", options).then((res) => console.log(res));
    setInput(initialValues);
  }

  // Ask user for updated details
  function handleEdit(e) {
    let editedFinnish = window.prompt("In finnish");
    let editedEnglish = window.prompt("In english");
    let editedItem = {
      in_finnish: editedFinnish,
      in_english: editedEnglish,
    };
    // Post updated exercise to database
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedItem),
    };
    // Delete outdated version of exercise
    fetch(`/vocabulary/` + e.id, {
      method: "delete",
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .then(() => {
        // Update visible list
        fetch("/vocabulary/", options)
          .then((res) => console.log(res))
          .then(() => {
            const newList = list.filter((el) => el.id !== e.id);
            setList([...newList, editedItem]);
          });
      });
  }

  //Filter item from database and visible list by comparing id's
  function handleDelete(e) {
    fetch(`/vocabulary/` + e.id, {
      method: "delete",
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .then(() => setList(list.filter((el) => el.id !== e.id)));
  }

  return (
    <div>
      <h1>EXERCISES</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* New exercise in finnish */}
          <input
            id="fi-mod"
            name="finnish"
            value={input.finnish}
            onChange={handleInputChange}
            placeholder="In finnish..."
          />
          {/* New exercise in english */}
          <input
            id="en-mod"
            name="english"
            value={input.english}
            onChange={handleInputChange}
            placeholder="In english..."
          />
          {/* Submit */}
          <Button variant="contained" id="submit-mod" type="submit">
            ADD
          </Button>
        </form>
      </div>

      <div className="content">
        <div className="item-list-mod">
          {list.map((e) => (
            <div className="exercise-box-mod">
              {/* Exercises */}
              <div>
                <span>
                  {e.in_finnish} {" = "}
                </span>
                <span> {e.in_english} </span>
                <span id="buttons">
                  {/* Delete button */}
                  <button id="delete-button">
                    <DeleteIcon
                      fontSize="large"
                      onClick={() => handleDelete(e)}
                    />
                  </button>
                  {/* Edit button */}
                  <button id="edit-button">
                    <BorderColorIcon
                      fontSize="large"
                      onClick={() => handleEdit(e)}
                    />
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
