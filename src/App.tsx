

import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import SubmitFeedback from "./pages/SubmitFeedback"

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/submit" element={<SubmitFeedback />} />
    </Routes>
  );
}

export default App;