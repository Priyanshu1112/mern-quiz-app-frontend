import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetStates } from "../store/actions/quizActions";
import { useRef } from "react";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navbarRef = useRef(null);
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

  const showConfigure = () => {
    // how can i get the height of navbar here? NOTE: this is inside navbar
    props.configureComponent.classList.toggle("d-hide");
  };

  return (
    <div
      ref={navbarRef}
      className="col-12 w-100 background shadow  mb-2 d-flex justify-content-between gap-3 px-5 py-1 align-items-center"
      //   style={{ height: "5vmin" }}
    >
      <span
        className="d-lg-none"
        onClick={() => {
          showConfigure();
        }}
      >
        <i className="ri-menu-line text-white "></i>
      </span>
      <h2 className="heading text-color-primary">QuizArena</h2>
      <button onClick={handleSignOut} className="btn-secondary">
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
