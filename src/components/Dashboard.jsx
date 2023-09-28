import Configure from "./Configure";
import Navbar from "./Navbar";
import QuizSection from "./QuizSection";
import RightSection from "./RightSection";

const Dashboard = () => {
  return (
    <div className="row  text-dark">
      <Navbar />
      <Configure />
      <QuizSection />
      <RightSection />
    </div>
  );
};

export default Dashboard;
