'use client';

import { type NextPage } from "next";
import { MapContainer,  TileLayer, GeoJSON as GeoJSONComponent } from 'react-leaflet';
// TODO: Fix this import to be from geojson and change the filename
import CensusTractData from "../data/census-tracts_min.json";
import 'leaflet/dist/leaflet.css';
import type {GeoJsonObject, Feature, Geometry} from "geojson";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";
import {Ref, useRef, useState } from "react";
import { Layer, LeafletMouseEvent } from "leaflet";
import { api } from "../utils/api";


interface LayerEventTarget {
  feature: {
    properties: { 
      tractname: string;
      name20: string;
    }
  }
}

interface GeoJSONElement {
  resetStyle: (element: any) => void
}

const CensusTractMap: NextPage = () => {
  const [userCensusTract, setUserCensusTract] = useState("");
  const updateUserCensusTract = api.user.addCensusTract.useMutation();
  const geoJsonRef = useRef();
  const handleFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    layer.on("click", (e: LeafletMouseEvent) => {
      const selectedCensusTract = (e.target as LayerEventTarget).feature.properties["name20"];
      setUserCensusTract(selectedCensusTract);
      updateUserCensusTract.mutate({censusTract: selectedCensusTract})
    })
    layer.on("mouseover", (e: LeafletMouseEvent) => {
      
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      (e.target).setStyle({
        	fillOpacity: 0.8,
      });
    });
    layer.on("mouseout", (e: LeafletMouseEvent) => {

      if(!geoJsonRef.current)
      {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      (geoJsonRef.current as GeoJSONElement).resetStyle(e.target)
    })
    return null;
  }

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
    <div className="bg-[#3276AE] flex flex-col items-center h-screen">
      {
        !userCensusTract ? 
        <>        
          <h1>Please select the census tract area that contains your address.</h1>
          <div id="map" className="w-1/2">
          <MapContainer center={[20.5, -157.510857]} zoom={7} scrollWheelZoom={true} style={{height: "400px"}} >
            <TileLayer
              attribution='&copy; "Map data © OpenStreetMap contributors, Esri Community Maps contributors, Map layer by Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              
            />
            <GeoJSONComponent data={CensusTractData as GeoJsonObject} style={(val: Feature<Geometry, {pop20: number}> | undefined) => censusTractStyle(val)} onEachFeature={(feature, layer) => handleFeature(feature, layer)} ref={geoJsonRef as Ref<any>} />
          </MapContainer>
        </div>
        </>
        : (
          <>
            <h1 className="text-white">Census Tract Selected is: {userCensusTract}</h1>
            <NextPageButtonLink pageName="zipcode" msg="Click here to continue." />
          </>
        )
      }
        
    </div>
  )
}

export default CensusTractMap