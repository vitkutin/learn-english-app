/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

function User() {
  let [list, setList] = useState([]);

  function Random() {
    return Math.floor(Math.random() * 10 + 1);
  }

  //Show a random exercise
  useEffect(() => {
    fetch(`http://localhost:8080/vocabulary/${Random}/`)
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

  //MITEN SAADAAN LIST.MAP(E) ELI KYSEINEN OBJEKTI TÄMÄN FUNKTION KÄYTTÖÖN?
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
