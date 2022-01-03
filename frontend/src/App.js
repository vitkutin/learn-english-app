/* eslint-disable no-unused-vars */
import "./Style.css";
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FaRegTrashAlt, FaEdit, FaAngleDown, FaAngleUp } from "react-icons/fa";

function App() {
  //async function componentDidMount() {
  //let hr = await fetch("http://localhost:8080/vocabulary");
  //let json = await hr.json();
  //this.setState({ vocabulary: json });
  //}

  //Clears textfield after input
  const initialValues = {
    date: "",
    description: "",
    tag: "",
    search: "",
  };

  const [input, setInput] = useState(initialValues);

  //List of tasks (contains one example task)
  let [list, setList] = useState([
    { id: 1, in_finnish: "tuoli", in_english: "chair" },
  ]);

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
      id: uuidv4(),
      date: input.date,
      description: input.description,
      tag: input.tag,
    };

    setList([...list, newItem]);
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
                  value={input.search}
                  onChange={handleInputChange}
                  placeholder="In english..."
                />
              </form>
            </div>
          </div>
        ))}
        <button id="submit" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}
export default App;
