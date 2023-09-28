import { useSelector } from "react-redux";

const Answered = () => {
  const { activeQuestion, quiz, answers } = useSelector(
    (state) => state.quizReducer
  );

  return (
    <div className="">
      {quiz[activeQuestion].options[answers[activeQuestion]] ===
      quiz[activeQuestion].correct_answer
        ? quiz[activeQuestion].options.map((option, ind) => {
            console.log(
              "correct answer",
              answers[activeQuestion] === ind.toString()
            );
            return (
              <p key={ind}>
                {ind + 1}:- {option}{" "}
                {answers[activeQuestion] === ind.toString() ? "✅" : ""}
              </p>
            );
          })
        : quiz[activeQuestion].options.map((option, ind) => {
            console.log("incorrect answer", answers[activeQuestion] === ind);
            return (
              <p key={ind}>
                {ind + 1}:- {option}{" "}
                {option === quiz[activeQuestion].correct_answer ? "✅" : ""}{" "}
                {answers[activeQuestion] === ind.toString() ? "❌" : ""}
              </p>
            );
          })}
      <p className="text-center">
        {quiz[activeQuestion].options[answers[activeQuestion]] ===
        quiz[activeQuestion].correct_answer
          ? "Correct Answer ✅"
          : "Incorrect Answer ❌"}
      </p>
    </div>
  );
};

export default Answered;
