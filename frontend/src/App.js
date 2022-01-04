/* eslint-disable no-unused-vars */
import "./Style.css";
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FaRegTrashAlt, FaEdit, FaAngleDown, FaAngleUp } from "react-icons/fa";

function App() {
  let [list, setList] = useState([]);

  function Random() {
    return Math.floor(Math.random() * 3 + 1);
  }

  //Show a random exercise
  useState(() => {
    fetch(`http://localhost:8080/vocabulary/${Random()}/`)
      .then((response) => response.json())
      .then((data) => setList(data));
  });

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
    <div>
      <nav>
        <Link to="/">USER</Link>
        <Link to="/mod">MOD</Link>
      </nav>
      <Outlet />

      <div className="item-list">
        {list.map((e) => (
          <div className="item-container">
            {/* Elements */}
            <div>
              <span id="fin">{e.in_finnish}</span>
              <form onSubmit={handleSubmit}>
                <input
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
    </div>
  );
}
export default App;
