import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
    setInput(initialValues);
  }

  //Edits task description and adds modified task to the end of the list
  function handleEdit(e) {
    let editedFinnish = window.prompt("In finnish");
    let editedEnglish = window.prompt("In english");
    let editedItem = {
      in_finnish: editedFinnish,
      in_english: editedEnglish,
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
          <TextField
            size="small"
            variant="outlined"
            id="fi-mod"
            name="finnish"
            value={input.finnish}
            onChange={handleInputChange}
            placeholder="In finnish"
          />
          <TextField
            size="small"
            variant="outlined"
            id="en-mod"
            name="english"
            value={input.english}
            onChange={handleInputChange}
            placeholder="In english"
          />
          <Button variant="contained" id="submit-mod" type="submit">
            ADD
          </Button>
        </form>
      </div>

      {/* List */}
      <div className="item-list-mod">
        {list.map((e) => (
          <div className="item-container-mod">
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
                  <DeleteIcon
                    fontSize="small"
                    onClick={() => handleDelete(e)}
                  />
                </button>
                {/* EDIT BUTTON */}
                <button id="taskBtn">
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
  );
}
