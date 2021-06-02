import './App.css';
import ESRIMap from './map/ESRIMap';
import MapSelector from './selector/MapSelector';

function App() {
  return (
    <div className="App">
      <MapSelector/>
      <ESRIMap></ESRIMap>
    </div>
  );
}

export default App;
