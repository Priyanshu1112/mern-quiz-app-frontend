import { useDispatch, useSelector } from "react-redux";
import {
  getSubmitted,
  incScore,
  next,
  prev,
  setActive,
  setAnswers,
  setDisabled,
  setScoreUpdates,
} from "../../store/actions/quizActions";
import { useEffect } from "react";
import axios from "axios";

const Questions = () => {
  const { quiz, activeQuestion, answers, score, isSubmitted, isScoreUpdated } =
    useSelector((state) => state.quizReducer);
  const dispatch = useDispatch();
  var scoreLocal = 0;
  const answerHandler = (e) => {
    const inp = [e.target.name, e.target.value];
    dispatch(setAnswers(inp));
  };

  const getScore = async () => {
    dispatch(setDisabled(false));
    console.log(answers);
    Object.keys(answers).forEach((ans) => {
      quiz[ans].options[answers[ans]] === quiz[ans].correct_answer
        ? (() => {
            scoreLocal += 10; // Increment scoreLocal
            dispatch(incScore()); // Dispatch the action to increment the score
          })()
        : console.log(
            quiz[ans].options[answers[ans]],
            quiz[ans].correct_answer
          );
    });
    // console.log("Questions----", uid);
    const uid = window.localStorage.getItem("user");

    axios.put("/score", { uid, scoreLocal });

    dispatch(setActive(0));
    dispatch(getSubmitted(true));
    dispatch(setScoreUpdates(true));
  };

  // console.log("isScoreUpdated-------", isScoreUpdated);

  useEffect(() => {
    console.log("score===", score);
    dispatch(setScoreUpdates(false));
  }, [isScoreUpdated]);

  const resetRadioBtns = () => {
    document.querySelectorAll('input[type="radio"]').forEach((btn) => {
      btn.checked = false;
    });
  };

  useEffect(() => {
    console.log(score);
  }, [score]);

  return (
    <div>
      <div style={{ height: "40vh" }}>
        <p className="">
          Q{activeQuestion + 1}:- {quiz[activeQuestion].question}
        </p>

        <div className="options ">
          {quiz[activeQuestion].options.map((opt, ind) => {
            return (
              <div key={ind} className="d-flex my-3 gap-3 align-items-center ">
                <input
                  type="radio"
                  name={activeQuestion}
                  value={ind}
                  checked={answers[activeQuestion] === ind.toString()}
                  onClick={(e) => {
                    answerHandler(e);
                  }}
                />
                <p className="mb-0">{opt}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container w-100 d-flex justify-content-between">
        <button
          disabled={activeQuestion > 0 ? false : true}
          onClick={(e) => {
            resetRadioBtns(e);
            dispatch(prev());
          }}
          className="btn-primary"
        >
          Prev
        </button>
        {!isSubmitted && (
          <button onClick={getScore} className="btn-primary">
            Submit
          </button>
        )}

        <button
          disabled={activeQuestion < quiz.length - 1 ? false : true}
          onClick={(e) => {
            resetRadioBtns(e);
            dispatch(next());
          }}
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Questions;
