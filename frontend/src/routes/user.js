/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

function User() {
  let [list, setList] = useState([]);
  let [data, setData] = useState("");

  //get random id from database
  function random() {
    fetch("http://localhost:8080/vocabulary/ids")
      .then((res) => res.json())
      .then((data) => setData(data.id));
  }

  //Show a random exercise
  useEffect(() => {
    fetch(`http://localhost:8080/vocabulary/5`)
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  //Clears textfield after input
  const initialValues = {
    answer: "",
  };

  const [input, setInput] = useState(initialValues);

  //Updates input state
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const answer = input.answer;
    console.log(answer);

    setInput(initialValues);
  }

  return (
    <div className="item-list">
      {list.map((e) => (
        <div className="item-container">
          {/* Elements */}
          <div>
            <span id="fin">{e.in_finnish}</span>
            <form onSubmit={handleSubmit}>
              <input
                id="en"
                name="answer"
                value={input.answer}
                onChange={handleInputChange}
                placeholder="In english..."
              />
              <button id="submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
export default User;
