import React from "react";
import "./App.css";
import WellnessContainer from "./containers/WellnessContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <div className="Wellness">
        <WellnessContainer />
      </div>
    </div>
  );
}

export default App;
