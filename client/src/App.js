import React, { useState } from "react";

import './App.css';
import ESRIMap from './map/ESRIMap';
import MapSelector from './selector/MapSelector';

function App() {
  const [isCollegeData, setCollegeMode] = useState(true);
  return (
    <div className="App">
      <MapSelector currentMode={isCollegeData} setMapMode={(value)=> setCollegeMode(value)} />
      <ESRIMap mapSelection={isCollegeData}></ESRIMap>
    </div>
  );
}

export default App;
