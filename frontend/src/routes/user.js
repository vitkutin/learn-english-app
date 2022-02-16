//@ts-check
import React, { useState } from "react";
import Button from "@mui/material/Button";

function User() {
  let [exerciseList, setExerciseList] = useState([]);
  var [score, setScore] = useState(0);
  var [index, setIndex] = useState(0);

  // Clears textfield after input
  const initialValues = {
    answer: "",
  };
  const [input, setInput] = useState(initialValues);

  /**
   * Fetches all exercise exercise id's from the database.
   * Presents a new exercise as long as there is another id in the list.
   * If there are no more exercises, presents the end message and score.
   * @index keeps track of submitted exercises.
   */
  function showNextExercise() {
    fetch("/vocabulary/ids")
      .then((res) => res.json())
      .then((data) => {
        try {
          if (index >= data.length) {
            // Hide asked word
            var fin = document.getElementById("fin");
            fin.style.display = "none";
            // Hide answer form
            var form = document.getElementById("form");
            form.style.display = "none";
            // Show end msg instead
            var end = document.getElementById("end-msg");
            end.style.display = "block";
          } else {
            setIndex(index + 1);
            fetch(`/vocabulary/${data[index].id}`)
              .then((response) => response.json())
              .then((data) => setExerciseList(data));
          }
        } catch (err) {
          console.log(err);
        }
      });
  }

  /**
   * Allows user to write into the input area.
   * @param {*} e - User input
   */
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  /**
   * Clears input areas after submitting.
   * @param {*} e - Event
   */
  function handleSubmit(e) {
    e.preventDefault();
    setInput(initialValues);
  }

  return (
    <div className="content">
      <div className="item-list">
        {exerciseList.map((e) => (
          <div className="exercise-box">
            {/* Score */}
            <span id="score">
              {"Score: "} {score}
            </span>
            <div>
              {/* Exercise word */}
              <span id="fin">{e.in_finnish}</span>
              {/* Answer form */}
              <form id="form" onSubmit={handleSubmit}>
                <input
                  id="answer"
                  name="answer"
                  value={input.answer}
                  onChange={handleInputChange}
                  placeholder="In english..."
                />
                {/* Submit button */}
                <Button
                  variant="contained"
                  id="submit"
                  type="submit"
                  onClick={() => {
                    // If the answer is correct, score goes up by one point and
                    // error message will be hidden in case last answer was incorrect
                    if (input.answer === e.in_english) {
                      setScore(score + 1);
                      var x = document.getElementById("error-msg");
                      x.style.display = "none";
                      showNextExercise();
                    } else {
                      // If the answer was incorrect, show error message and
                      // do not add a point to score
                      var y = document.getElementById("error-msg");
                      y.style.display = "block";
                      showNextExercise();
                    }
                  }}
                >
                  Submit
                </Button>
              </form>
              {/* Ending message */}
              <span id="end-msg">
                {"Quiz finished! You got "}
                {score}
                {" points!"}
              </span>
              {/* Error message */}
              <span id="error-msg">{"Wrong answer, no point!"}</span>
            </div>
          </div>
        ))}
        {/* Start button */}
        <Button
          variant="contained"
          id="start-button"
          onClick={() => {
            var x = document.getElementById("start-button");
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
            showNextExercise();
          }}
        >
          BEGIN
        </Button>
      </div>
    </div>
  );
}
export default User;
