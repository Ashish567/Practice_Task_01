import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Reservation from "./Pages/Reservation";
import MyNavbar from "./Components/Navbar";

function App() {
  return (
    <div className="app">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
    </div>
  );
}

export default App;
