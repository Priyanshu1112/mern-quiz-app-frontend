import { useDispatch, useSelector } from "react-redux";
import { prev, next } from "../../store/actions/quizActions";
import Unanswered from "./Unanswered";
import Answered from "./Answered";

const Submitted = () => {
  const dispatch = useDispatch();
  const { score, quiz, answers, activeQuestion } = useSelector(
    (state) => state.quizReducer
  );

  return (
    <div>
      <h2 className="text-center">Marks Scored - {score}</h2>
      <div style={{ height: "50vh" }}>
        <p>
          Q{activeQuestion + 1}:- {quiz[activeQuestion].question}
        </p>
        {activeQuestion in answers ? <Answered /> : <Unanswered />}
      </div>
      <div className="container w-100 d-flex justify-content-between">
        <button
          disabled={activeQuestion > 0 ? false : true}
          onClick={() => {
            dispatch(prev());
          }}
          className="btn-primary"
        >
          Prev
        </button>

        <button
          disabled={activeQuestion < quiz.length - 1 ? false : true}
          onClick={() => {
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

export default Submitted;
