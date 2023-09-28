import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RightSection = () => {
  const { isSubmitted } = useSelector((state) => state.quizReducer);
  const [username] = useState(window.localStorage.getItem("username"));
  console.log(window.localStorage.getItem("username"));

  const [scoreList, setScoreList] = useState([]);

  const GetUsersScore = async () => {
    try {
      const { data } = await axios.get("/usersScore");
      // Sort the scoreList array in descending order based on the score
      const sortedScoreList = data.scoreList.sort((a, b) => b.score - a.score);
      setScoreList(sortedScoreList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUsersScore();
  }, [isSubmitted]);

  return (
    <div className="col-3">
      <p className="text-center border-bottom">
        {username ? username : "unnamed"}
      </p>
      {scoreList.map((slm, ind) => (
        <p key={ind}>
          {" "}
          {ind + 1}:- {slm.displayName}:- {slm.score}
        </p>
      ))}
    </div>
  );
};

export default RightSection;
