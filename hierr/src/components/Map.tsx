import React from "react";
import { MapContainer,  TileLayer } from 'react-leaflet';
// TODO: Fix this import to be from geojson and change the filename
import CensusTractData from "./data/census-tracts_min.json";
import 'leaflet/dist/leaflet.css';
import { GeoJSON } from 'react-leaflet';
import type {GeoJsonObject, Feature, Geometry} from "geojson"


export default function Map() {
  const getCensusTractFillColor = (population2020: number) => {
    if(population2020 <= 2500)
    {
      return "#bd93f9"
    }
    if(population2020 > 2500 && population2020 < 5000) {
      return "#ffb86c"
    }
    if (population2020 > 5000 && population2020 < 10000)
    {
      return "#8be9fd";
    }
    return undefined;
  }
  const censusTractStyle = (val: Feature<Geometry, any> | undefined) => {
    if(!val)
    {
      return {};
    }
    const pop20 = val.properties.pop20;
    return {
				fillColor: getCensusTractFillColor(pop20),
				color: '#44475a',
				weight: 0.5,
				opacity: 1,
				fillOpacity: 0.4,
			}
  }
  return (
    <div id="map">
      <MapContainer center={[20.5, -157.510857]} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; "Map data © OpenStreetMap contributors, Esri Community Maps contributors, Map layer by Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <GeoJSON data={CensusTractData as GeoJsonObject} style={(val) => censusTractStyle(val)}/>
      </MapContainer>
    </div>
  )
}