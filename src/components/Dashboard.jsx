import { useState } from "react";
import Configure from "./Configure";
import Navbar from "./Navbar";
import QuizSection from "./QuizSection";
import RightSection from "./RightSection";

const Dashboard = () => {
  const [configureComponent, setConfigureComponent] = useState("");
  return (
    <div className="row  text-dark">
      <Navbar configureComponent={configureComponent} />
      <Configure setConfigureComponent={setConfigureComponent} />
      <QuizSection />
      <RightSection />
    </div>
  );
};

export default Dashboard;
