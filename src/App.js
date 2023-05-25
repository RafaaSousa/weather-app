import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Weather from "./Weather";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} /> {/* Usar "element" em vez de "component" */}
          <Route path="/weather/:city" element={<Weather />} /> {/* Usar "element" em vez de "component" */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;