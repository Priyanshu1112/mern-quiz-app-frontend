import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";

const App = () => {
  const user = window.localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    user ? navigate("/dashboard") : navigate("/");
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
