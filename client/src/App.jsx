// import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <h1 className="text-green-400">ChatterBox</h1>
      <button className="btn btn-outline btn-info">Info</button>
      <button className="btn btn-outline btn-success">Success</button>
      <button className="btn btn-outline btn-warning">Warning</button>
      <button className="btn btn-outline btn-error">Error</button>
    </>
  );
}

export default App;
