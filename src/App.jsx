import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoodPage from "./pages/MoodPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mood" element={<MoodPage />} />
      </Routes>
    </Router>
  );
}

export default App;


