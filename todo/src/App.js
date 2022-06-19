import "./App.css";
import Home from "./components/home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from "./components/main";
import Recycle from "./components/recycle-bin";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes >
          <Route path = "/" element={<Home/>} />
          <Route path = "/main" element={<Main/>} />
            <Route path= "/main/recycle" element={<Recycle />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;