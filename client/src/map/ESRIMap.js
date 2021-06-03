import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import * as axios from "axios";

import "./ESRIMap.css";

function ESRIMap(props) {
  const mapDiv = useRef(null);
  const [collegeData, setCollegeData] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);
  const [map, setMap] = useState(null);

  const plotMapLayer = () => {
    if (collegeData.length || hospitalData.length) {
      map.removeAll();
      if (props.mapSelection) {
        addUniversityLayer();
      } else {
        addHospitalLayer();
      }
    }
  };

  const addUniversityLayer = () => {
    let markerSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [25, 0, 220],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [0, 255, 0],
        width: 2,
      },
    };
    let markerGraphics = [];
    collegeData.forEach((university) => {
      var point = {
        type: "point", // autocasts as new Point()
        longitude: university.longitude,
        latitude: university.latitude,
      };

      let pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
      });

      markerGraphics.push(pointGraphic);
    });

    let graphicsLayer = new GraphicsLayer({
      id: "university",
      graphics: markerGraphics,
    });

    map.add(graphicsLayer);
  };

  const addHospitalLayer = () => {
    let markerSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [25, 0, 220],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 102],
        width: 2,
      },
    };
    let markerGraphics = [];
    hospitalData.forEach((hospital) => {
      var point = {
        type: "point", // autocasts as new Point()
        longitude: hospital.longitude,
        latitude: hospital.latitude,
      };

      let pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
      });

      markerGraphics.push(pointGraphic);
    });

    let graphicsLayer = new GraphicsLayer({
      id: "university",
      graphics: markerGraphics,
    });

    map.add(graphicsLayer);
  };

  async function fetchCollegeData() {
    let collegeData = await axios.get("/api/colleges");
    setCollegeData(collegeData.data);
  }

  async function fetchHospitalData() {
    let hospitalData = await axios.get("/api/hospitals");
    setHospitalData(hospitalData.data);
  }

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

      setMap(map);

      fetchCollegeData();
      fetchHospitalData();
    }
  }, []);

  useEffect(() => {
    plotMapLayer();
  }, [props.mapSelection, collegeData, hospitalData]);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default ESRIMap;
