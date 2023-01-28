import React from 'react';
import Polis from "./components/Polis";
import Map from "./components/Map";
import DemographicsSurvey from "./components/DemographicsSurvey";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello Jez</h1>
      <Map />
      <Polis />
      <DemographicsSurvey />
    </div>
  );
}

export default App;
