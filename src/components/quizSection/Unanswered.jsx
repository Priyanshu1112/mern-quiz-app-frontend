import { useSelector } from "react-redux";

const Unanswered = () => {
  const { activeQuestion, quiz } = useSelector((state) => state.quizReducer);
  return (
    <div>
      {quiz[activeQuestion].options.map((opt, ind) => {
        console.log(opt);
        return opt === quiz[activeQuestion].correct_answer ? (
          <p>
            {ind + 1}:- {opt} ✅
          </p>
        ) : (
          <p>
            {ind + 1}:- {opt}
          </p>
        );
      })}
      <p className="text-center">This Question was not answered ☠️</p>
    </div>
  );
};

export default Unanswered;
