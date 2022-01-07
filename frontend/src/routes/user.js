/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

function User() {
  let [list, setList] = useState([]);

  //Show a random exercise
  function random() {
    fetch("http://localhost:8080/vocabulary/ids")
      .then((res) => res.json())
      .then((data) => {
        fetch(`http://localhost:8080/vocabulary/${data.id}`)
          .then((response) => response.json())
          .then((data) => setList(data));
      });
  }

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

  //Tee lista jossa on sanaparit, jotka on jo submitattu.
  //Tarkista onko listassa yhtä paljon sanapareja kuin tietokannassa,
  //Kun on, näytä teksti "Suoritettu" + score

  return (
    <div className="item-list">
      {list.map((e) => (
        <div className="item-container">
          {/* Elements */}
          <div>
            <span id="score">{"Score: 0 pts"}</span>
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
      <div>
        <button id="nextBtn" onClick={random}>
          Next exercise
        </button>
      </div>
    </div>
  );
}
export default User;
