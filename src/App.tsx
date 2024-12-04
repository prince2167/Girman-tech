import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/page/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
