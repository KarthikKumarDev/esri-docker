import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

import './ESRIMap.css'

function ESRIMap() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

       let map = new Map({
        basemap: "hybrid",
        layers: [],
      });

      const mapView = new MapView({
        container: mapDiv.current,
        center: [58.4217, 23.57947],
        zoom: 3,
        map: map,
      });

    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default ESRIMap;