// import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuery,
  getStatus,
  resetStates,
  setDisabled,
} from "../store/actions/quizActions";

const Configure = (props) => {
  const { start, isSubmitted, isDisabled } = useSelector(
    (state) => state.quizReducer
  );
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [allcategories, setallcategories] = useState([]);
  const [error, setError] = useState({
    amount: "",
    category: "",
    difficulty: "",
  });
  // const [startQuiz, setStartQuiz] = useState(false);

  const dispatch = useDispatch();

  const getCategory = async () => {
    const { data } = await axios.get("https://opentdb.com/api_category.php");
    setallcategories(data.trivia_categories);
    // console.log("allcategories---", allcategories);
  };

  useEffect(() => {
    getCategory();
  }, []);

  let c_render = "";
  if (allcategories.length > 0) {
    c_render = allcategories.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ));
  }
  // console.log(c_render);

  const validator = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setError({ amount: "Valid amount is required!" });
      return;
    }
    if (amount > 10) {
      setError({ amount: "Amount cannot be greater than 10" });
      return;
    }
    if (!category) {
      setError({ category: "Category needs to selected!" });
      return;
    }
    if (!difficulty) {
      setError({ difficulty: "Select difficulty to continue!" });

      return;
    }
    setError({});
    SubmitHandler(e);
  };

  const SubmitHandler = () => {
    dispatch(resetStates());
    // var config = {
    //   amount,
    //   category,
    //   difficulty,
    // };
    // dispatch(getQuery(config));
    // dispatch(getStatus(true));
    // console.log(config);
    document.getElementById("configure").classList.toggle("d-hide");
    setTimeout(() => {
      var config = {
        amount,
        category,
        difficulty,
      };
      dispatch(getQuery(config));
      dispatch(getStatus(true));
      dispatch(setDisabled(true));
      console.log(config);
    }, 100);
  };

  useEffect(() => {
    props.setConfigureComponent(document.getElementById("configure"));
  }, []);

  return (
    <div
      id="configure"
      className="col-lg-3 col-5 border-right vh-100 d-flex flex-column align-items-center pt-5 d-hide p-hide"
    >
      <div
        className=" w-100 fs-3 d-lg-none"
        onClick={() => {
          document.getElementById("configure").classList.toggle("d-hide");
        }}
      >
        <i className="ri-close-line"></i>
      </div>
      <h2 className="heading " style={{ textShadow: "none" }}>
        Configure
      </h2>
      <form onSubmit={validator} className="text-center w-75">
        <div className=" mb-3">
          <input
            disabled={isDisabled}
            onChange={(e) => {
              if (e.target.value >= 0) setAmount(e.target.value);
            }}
            value={amount}
            className="form-control "
            type="number"
            placeholder="Amount of Questions"
          />
          <small className="text-danger ">{error.amount}</small>
        </div>
        <div className="mb-3">
          <select
            disabled={isDisabled}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="form-control "
          >
            <option value="">Any Category</option>
            {c_render}
          </select>
          <small className="text-danger">{error.category}</small>
        </div>

        <div className="mb-3">
          <select
            disabled={isDisabled}
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
            className="form-control"
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <small className="text-danger ">{error.difficulty}</small>
        </div>

        {start ? "" : <button className="btn-primary">Start Quiz</button>}
      </form>
      {start ? (
        !isSubmitted ? (
          <button
            type="button"
            onClick={() => {
              dispatch(resetStates());
            }}
            className="btn-secondary"
          >
            Stop Quiz
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              SubmitHandler();
            }}
            className="btn-primary"
          >
            Start Again
          </button>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Configure;
