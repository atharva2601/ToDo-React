import "./App.css";
import Home from "./components/home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from "./components/main";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes >
          <Route path = "/" element={<Home/>} />
          <Route path = "/main" element={<Main/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;