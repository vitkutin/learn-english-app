import React, { useState } from "react";
import Button from "@mui/material/Button";

function User() {
  let [list, setList] = useState([]);
  var [score, setScore] = useState(0);

  //Clears textfield after input
  const initialValues = {
    answer: "",
  };

  const [input, setInput] = useState(initialValues);

  //Show a random exercise
  function showRandomExercise() {
    fetch("http://localhost:8080/vocabulary/ids")
      .then((res) => res.json())
      .then((data) => {
        fetch(`http://localhost:8080/vocabulary/${data.id}`)
          .then((response) => response.json())
          .then((data) => setList(data));
      });
  }

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
    setInput(initialValues);
  }

  //Tee lista jossa on sanaparit, jotka on jo submitattu.
  //Tarkista onko listassa yhtä paljon sanapareja kuin tietokannassa,
  //Kun on, näytä teksti "Suoritettu" + score

  return (
    <div className="content">
      <div className="item-list">
        {list.map((e) => (
          <div className="exercise-box">
            <span id="score">
              {"Score: "} {score}
            </span>
            {/* Elements */}
            <div>
              <span id="fin">{e.in_finnish}</span>
              <form onSubmit={handleSubmit}>
                <input
                  id="answer"
                  name="answer"
                  value={input.answer}
                  onChange={handleInputChange}
                  placeholder="In english..."
                />
                <Button
                  variant="contained"
                  id="submit"
                  type="submit"
                  onClick={() => {
                    if (input.answer === e.in_english) {
                      setScore(score + 1);
                      var x = document.getElementById("error-msg");
                      x.style.display = "none";
                      showRandomExercise();
                    } else {
                      var y = document.getElementById("error-msg");
                      y.style.display = "block";
                    }
                  }}
                >
                  Submit
                </Button>
              </form>
              <span id="error-msg">{"Try again!"}</span>
            </div>
          </div>
        ))}
        <Button
          variant="contained"
          id="next-button"
          onClick={() => {
            var x = document.getElementById("next-button");
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
            showRandomExercise();
          }}
        >
          BEGIN
        </Button>
      </div>
    </div>
  );
}
export default User;
