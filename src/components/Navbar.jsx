import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetStates } from "../store/actions/quizActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        dispatch(resetStates());
        window.localStorage.removeItem("user");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div
      className="col-12 w-100 background shadow  mb-2 d-flex justify-content-between gap-3 px-5 py-1 align-items-center"
      //   style={{ height: "5vmin" }}
    >
      <h2 className="heading text-color-primary">QuizArena</h2>
      <button onClick={handleSignOut} className="btn-secondary">
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
