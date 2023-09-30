import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderComponent from "./LoaderComponent";
import NotStarted from "./quizSection/NotStarted";
import Questions from "./quizSection/Questions";
import { setQuiz } from "../store/actions/quizActions";
import Submitted from "./quizSection/Submitted";

const QuizSection = () => {
  const { query, start, quiz, isSubmitted } = useSelector(
    (state) => state.quizReducer
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(start);
  //   const GetQuestions = async () => {
  //     try {
  //       let url = `https://opentdb.com/api.php?amount=${query.amount}&category=${query.category}&difficulty=${query.difficulty}`;

  //       const { data } = await axios.get(url);
  //       let quizData = data.results.reduce((acc, cv) => {
  //         return [
  //           ...acc,
  //           {
  //             question: decodeHTML(cv.question),
  //             correct_answer: decodeHTML(cv.correct_answer),
  //             options: createOptions(cv.incorrect_answers, cv.correct_answer),
  //           },
  //         ];
  //       }, []);
  //       dispatch(setQuiz(quizData));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (start) {
  //     GetQuestions();
  //   }
  // }, [start]);

  const GetQuestions = useCallback(async () => {
    try {
      let url = `https://opentdb.com/api.php?amount=${query.amount}&category=${query.category}&difficulty=${query.difficulty}`;

      const { data } = await axios.get(url);
      let quizData = data.results.reduce((acc, cv) => {
        return [
          ...acc,
          {
            question: decodeHTML(cv.question),
            correct_answer: decodeHTML(cv.correct_answer),
            options: createOptions(cv.incorrect_answers, cv.correct_answer),
          },
        ];
      }, []);
      dispatch(setQuiz(quizData));
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        console.log("ERR_NETWORK");
      }
    }
  }, [dispatch, query.amount, query.category, query.difficulty]);

  useEffect(() => {
    console.log(start);

    if (start) {
      GetQuestions();
    }
  }, [start, GetQuestions]);

  function decodeHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.documentElement.textContent;
  }

  const createOptions = (incOpt, corOpt) => {
    const optLen = incOpt.length;
    const n = Math.floor(Math.random() * optLen);
    if (n == 0) {
      return [corOpt, ...incOpt];
    } else if (n > 2) {
      return [...incOpt, corOpt];
    } else {
      return [...incOpt.slice(0, n), corOpt, ...incOpt.slice(n)];
    }
  };

  return (
    <div
      className="col-lg-6 col-9   border-right padding py-3"
      style={{ height: "100vh" }}
    >
      {!start ? (
        <NotStarted />
      ) : Object.keys(quiz).length === 0 ? (
        <LoaderComponent />
      ) : isSubmitted ? (
        <Submitted />
      ) : (
        <Questions />
      )}
    </div>
  );
};

export default QuizSection;
