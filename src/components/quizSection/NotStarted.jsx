import { useSelector } from "react-redux";

const NotStarted = () => {
  const { start } = useSelector((state) => state.quizReducer);
  return (
    <div
      className="w-100 py-3 rounded d-flex flex-column align-items-center"
      style={{ background: !start ? "#ef9d59" : "" }}
    >
      <img className="w-75" src="images/quizSection.jpg" alt="" />
      <p
        className="text-color-primary text-center para"
        style={{ textShadow: "none" }}
      >
        Oops, no active quiz! <br />
        Get started by configuring and starting a quiz.
      </p>
    </div>
  );
};

export default NotStarted;
