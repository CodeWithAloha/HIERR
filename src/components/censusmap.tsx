'use client';

import { type NextPage } from "next";
import { MapContainer,  TileLayer, GeoJSON } from 'react-leaflet';
// TODO: Fix this import to be from geojson and change the filename
import CensusTractData from "../data/census-tracts_min.json";
import 'leaflet/dist/leaflet.css';
import type {GeoJsonObject, Feature, Geometry} from "geojson";
import Link from "next/link";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";
// TODO: Migrate the following:
//! select the basemap layer using the dropdown
// function updateBaseMap(baseMapSelection) {
// 	if (baseMap) {
// 		map.removeLayer(baseMap);
// 	}
// 	switch (baseMapSelection) { 
// 		case "osm": 
// 			baseMap = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
// 			break;
// 		case "esri_light":
// 			baseMap = L.tileLayer(`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}`, {attribution: "Map data © OpenStreetMap contributors, Esri Community Maps contributors, Map layer by Esri"}).addTo(map);
// 			break;
// 		case "esri_dark":
// 			baseMap = L.tileLayer(`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`, {attribution: "Map data © OpenStreetMap contributors, Esri Community Maps contributors, Map layer by Esri"}).addTo(map);
// 			break;
// 		case "carto_dark":
// 			baseMap = L.tileLayer(`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'`, {attribution:
// 			'&copy; <a href="https://www.openstreetmap.org/copyright">CartoDB Dark</a> contributors'}).addTo(map);
// 			break;
// 		default:
// 			baseMap = L.tileLayer(`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`, {attribution: "Map data © OpenStreetMap contributors, Esri Community Maps contributors, Map layer by Esri"}).addTo(map);
// 			break;	
// 	}
// }

// async function addCensusTracts() {
// 	const response = await fetch('/census-tracts_min.geojson')
// 	const data = await response.json()

// 	//! create a layer from the response 
// 	var geojson = L.geoJson(data, {
// 		style: function (feature) {
// 			//! conditionally color each tract based on the ['pop20'] t (population 2020)
// 			//! more info Census Blocks ['pop20'] here: http://proximityone.com/geo_blocks.html

// 			// TODO: add more fine grained conditions for color palette | Maybe-TODO: possibly change the the if/else to a switch statement
// 			var color
// 			var pop20 = feature.properties['pop20']
// 			if (pop20 <= 2500) {
// 				color = '#bd93f9'
// 			} else if (pop20 < 5000 && pop20 > 2500) {
// 				color = '#ffb86c'
// 			} else if (feature.properties['pop20'] < 10000 && feature.properties['pop20'] > 5000) {
// 				color = '#8be9fd'
// 			}
// 			//
// 			return {
// 				fillColor: color,
// 				color: '#44475a',
// 				weight: 0.5,
// 				opacity: 1,
// 				fillOpacity: 0.4,
// 			}
// 		},

// 		//! change fill opacity on mouse in and out
// 		onEachFeature: function (feature, layer) {
// 			layer.on({
// 					mouseover: function (e) {
// 							var layer = e.target;
// 							layer.setStyle({
// 									fillOpacity: 0.8,
// 							});
// 							let name = e.target.feature.properties['tractname']
// 							layer.bindPopup(name).openPopup();
// 					},
// 					mouseout: function (e) {
// 							geojson.resetStyle(layer);
// 							layer.closePopup();
// 					},
// 			});
// 		}
// 	}).addTo(map)
// }
// addCensusTracts();

// var popup = L.popup();
// // popup on click that shows lat/long
// // TODO: add users census tract info to polis embed
// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent(e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);

const CensusTractMap: NextPage = () => {

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
  const censusTractStyle = (val: Feature<Geometry, {pop20: number}> | undefined) => {
    if(!val)
    {
      return {};
    }
    const pop20 = Number(val.properties.pop20);
    return {
				fillColor: getCensusTractFillColor(pop20),
				color: '#44475a',
				weight: 0.5,
				opacity: 1,
				fillOpacity: 0.4,
			}
  }
  return (
    <div className="bg-blue-default flex flex-col items-center h-screen">
      <div className="rounded overflow-hidden shadow-lg bg-white my-6">
        <div id="map" className="w-full">
        <MapContainer center={[20.5, -157.510857]} zoom={7} scrollWheelZoom={true} style={{height: "400px"}}>
          <TileLayer
            attribution='&copy; "Map data © OpenStreetMap contributors, Esri Community Maps contributors, Map layer by Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          />
          <GeoJSON data={CensusTractData as GeoJsonObject} style={(val: Feature<Geometry, {pop20: number}> | undefined) => censusTractStyle(val)}/>
        </MapContainer>
        </div>
        <div className="px-6 py-4 items-center">
          <h1 className="text-black">Please select the census tract area that contains your address.</h1>
        </div>
      </div>
      <NextPageButtonLink pageName="zipcode" msg="Click here to continue." />
    </div>
  )
}

export default CensusTractMap