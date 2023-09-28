import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase-config";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const addUser = async (userCred) => {
    try {
      console.log("add user called");
      const { displayName, uid } = userCred;
      // const { success } = await axios.post("/addUser", { displayName, uid });
      const { success, id } = await axios.post("/addUser", {
        displayName,
        uid,
      });

      console.log("ID from db-----", id);
      window.localStorage.setItem("user", id);

      console.log(success);
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = async (userCred) => {
    try {
      const { uid } = userCred;
      const { success, id } = await axios
        .get(`/checkUser?uid=${uid}`)
        .then((res) => {
          return res.data;
        });
      !success ? addUser(userCred) : window.localStorage.setItem("user", id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        // console.log(userCred.uid);
        checkUser(userCred);
        console.log(window.localStorage.getItem("username"));
      }
    });
  }, [auth]);

  const handleClick = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then((userCred) => {
        if (userCred) {
          // console.log(typeof userCred.user.uid);
          window.localStorage.setItem("username", userCred.user.displayName);

          navigate("/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid g-0 vw-100 overflow-hidden background text-color-primary ">
      <div className="row g-0">
        <div className="col-lg-6 text-center px-3 d-flex flex-column justify-content-center align-items-center gap-5">
          <section className="d-flex flex-column">
            <h1 className="heading">QuizArena</h1>
            <h3 className="subheading">
              Challenge Your <span className="color-tertiary">Knowledge</span> ,
              Top the
              <span className="color-secondary"> Leaderboard!</span>
            </h3>
            <p className="para">
              Test your knowledge and challenge yourself with our interactive
              quizzes. Learn new facts and have fun along the way.
            </p>
          </section>
          <button className="btn-primary" onClick={handleClick}>
            Continue to Quiz
          </button>
        </div>
        <div className="col-lg-6">
          <img className="vh-100" src="images/home.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
