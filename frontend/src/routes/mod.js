import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";

export default function Mod() {
  let [list, setList] = useState([]);

  // Clears textfield after input
  const initialValues = {
    finnish: "",
    english: "",
  };

  const [input, setInput] = useState(initialValues);

  // Shows all exercises from database
  useEffect(() => {
    fetch(`http://localhost:8080/vocabulary/`)
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  // Updates input state
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  // Creates new item from input, adds it to the list
  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      in_finnish: input.finnish,
      in_english: input.english,
    };
    setList([...list, newItem]);
    // Sends item to database
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };
    fetch("http://localhost:8080/vocabulary/", options).then((res) =>
      console.log(res)
    );
    setInput(initialValues);
  }

  // Edits exercise and adds updated version to the end of the list
  // And updates database
  function handleEdit(e) {
    let editedFinnish = window.prompt("In finnish");
    let editedEnglish = window.prompt("In english");
    let editedItem = {
      in_finnish: editedFinnish,
      in_english: editedEnglish,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedItem),
    };
    fetch(`http://localhost:8080/vocabulary/` + e.id, {
      method: "delete",
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .then(() => {
        fetch("http://localhost:8080/vocabulary/", options)
          .then((res) => console.log(res))
          .then(() => {
            const newList = list.filter((el) => el.id !== e.id);
            setList([...newList, editedItem]);
          });
      });
  }

  //Filters item from database and list by comparing id's
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
      {/* Forms for adding a new exercise*/}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            id="fi-mod"
            name="finnish"
            value={input.finnish}
            onChange={handleInputChange}
            placeholder="In finnish..."
          />
          <input
            id="en-mod"
            name="english"
            value={input.english}
            onChange={handleInputChange}
            placeholder="In english..."
          />
          <Button variant="contained" id="submit-mod" type="submit">
            ADD
          </Button>
        </form>
      </div>

      <div className="content">
        {/* LIST */}
        <div className="item-list-mod">
          {list.map((e) => (
            <div className="exercise-box-mod">
              {/* ELEMENTS */}
              <div>
                <span>
                  {e.in_finnish} {" = "}
                </span>
                <span> {e.in_english} </span>
                <span id="buttons">
                  {/* DELETE BUTTON */}
                  <button id="delete-button">
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => handleDelete(e)}
                    />
                  </button>
                  {/* EDIT BUTTON */}
                  <button id="edit-button">
                    <BorderColorIcon
                      fontSize="small"
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
