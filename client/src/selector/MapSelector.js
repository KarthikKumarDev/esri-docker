import "./MapSelector.css";

function MapSelector(props) {
  return (
    <div className="radio-selector">
      <input type="radio" name="rg1" checked={props.currentMode} onChange= {() => props.setMapMode(true)} /> College Data
      <input type="radio" name="rg1" checked={!props.currentMode} onChange= {() => props.setMapMode(false)} /> Hospital Data
    </div>
  );
}

export default MapSelector;
