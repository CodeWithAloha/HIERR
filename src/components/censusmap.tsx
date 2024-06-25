/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { type NextPage } from "next";
import {
  MapContainer,
  TileLayer,
  GeoJSON as GeoJSONComponent,
} from "react-leaflet";
// TODO: Fix this import to be from geojson and change the filename
import CensusTractData from "../data/census-tracts_min.json";
import "leaflet/dist/leaflet.css";
import type { GeoJsonObject, Feature, Geometry } from "geojson";
import type { Ref } from "react";
import { useEffect, useRef, useState } from "react";
import type { Layer, LeafletMouseEvent } from "leaflet";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import { api } from "../utils/api";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";
import { TiInputChecked } from "react-icons/ti";
import ProgressBar from "./ProgressBar";
import InfoPopup from "./InfoPopup";
import CensusMapInfo from "./CensusMapInfo";

interface LayerEventTarget {
  feature: {
    properties: {
      tractname: string;
      name20: string;
    };
  };
}

interface FeatureProperties {
  tractname: string;
  name20: string;
  pop20: number;
}

const CensusTractMap: NextPage = () => {
  const [userCensusTract, setUserCensusTract] = useState<string | null>(null);
  const [censusTractComplete, setCensusTractComplete] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const selectedStyle = { weight: 3, color: "red", opacity: 1 };
  const defaultStyle = {
    fillColor: "#CCCCCC",
    color: "#44475a",
    weight: 1,
    opacity: 0.7,
    fillOpacity: 0.2,
  };

  const censusTractDB = api.user.getCensusTract.useQuery();

  useEffect(() => {
    if (censusTractDB && censusTractDB.data) {
      if (censusTractDB.data.censustract !== null) {
        setCensusTractComplete(true);
        setDisabled(false);
      }
      setUserCensusTract(censusTractDB.data?.censustract);
    }
  }, [censusTractDB.data?.censustract]);

  const geoJsonRef = useRef();
  const handleFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    layer.on("click", (e: LeafletMouseEvent) => {
      const selectedCensusTract = (e.target as LayerEventTarget).feature
        .properties["name20"];
      setUserCensusTract(selectedCensusTract);
      setCensusTractComplete(true);
      setDisabled(false);
      e.target.setStyle(selectedStyle);
      e.target._recordedStyle = selectedStyle;
    });
    layer.on("mouseover", (e: LeafletMouseEvent) => {
      e.target.setStyle({
        fillOpacity: 0.5,
      });
    });
    layer.on("mouseout", (e: LeafletMouseEvent) => {
      if (!geoJsonRef.current) {
        return;
      }
      if (e.target && e.target._recordedStyle == selectedStyle) {
        return;
      }
      e.target.setStyle(defaultStyle);
    });
    return null;
  };

  const censusTractStyle = (
    val: Feature<Geometry, { pop20: number; name20: string }> | undefined
  ) => {
    if (!val) {
      return {};
    }

    if (val.properties.name20 === userCensusTract) {
      return selectedStyle;
    }

    return defaultStyle;
  };

  const updateUserCensusTract = api.user.addCensusTract.useMutation();
  const handleSubmit = () => {
    // TODO: Fix conditional
    updateUserCensusTract.mutate({ censusTract: userCensusTract ?? "" });
  };

  const searchKey = process.env.NEXT_PUBLIC_SEARCH_API;
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-lg font-semibold text-white md:mt-4 md:text-3xl">
        Step 1: Select Your Census Tract
      </h1>
      {censusTractComplete ? (
        <ProgressBar completed={14} />
      ) : (
        <ProgressBar completed={2} />
      )}
      <InfoPopup
        title="What do we use this data for?"
        PopupInfo={CensusMapInfo}
      />
      {censusTractComplete ? (
        <div className="mb-5 mt-6 flex items-center">
          <h1 className="mb-2 mr-5 flex flex-row items-center justify-center gap-1 font-thin text-white">
            <TiInputChecked className="text-2xl text-yellowGreen " />
            <strong>{`You selected track ${String(
              userCensusTract //we need to add a check for null
            )}`}</strong>
          </h1>
          <Link className="flex" href={{ pathname: "./zipcode" }}>
            <button
              className="mb-1 flex flex-row items-center justify-center rounded-full border-2 border-dashed border-lightGreen bg-yellowGreen px-6
          py-1 text-lg text-blue-darker  no-underline shadow-xl transition ease-in-out 
           hover:translate-y-1  hover:bg-lightGreen"
              onClick={() => handleSubmit()}
              disabled={disabled}
            >
              Next <GrLinkNext />
            </button>
          </Link>
        </div>
      ) : (
        <div className="mb-5 mt-5"></div>
      )}
      <div className="overflow-visible rounded bg-white shadow-xl">
        <div id="map" className="w-full">
          <MapContainer
            center={[21.43805, -157.985262]}
            zoom={11}
            scrollWheelZoom={true}
            style={{ height: "385px" }}
          >
            <EsriLeafletGeoSearch
              position="topleft"
              expanded={true}
              placeholder="Search for your address"
              searchBounds={[
                [18.367807, -162.171387],
                [23.131708, -153.404297],
              ]}
              providers={{
                arcgisOnlineProvider: { apikey: searchKey },
              }}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSONComponent
              data={CensusTractData as GeoJsonObject}
              style={(
                val:
                  | Feature<Geometry, { pop20: number; name20: string }>
                  | undefined
              ) => censusTractStyle(val)}
              onEachFeature={(feature, layer) => handleFeature(feature, layer)}
              ref={geoJsonRef as Ref<any>}
            />
          </MapContainer>
          <div className="items-center px-6 py-4">
            <p className="text-black md:text-md text-sm">
              Use the ➕ and ➖ on the map to find the census tract area that
              contains your address
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CensusTractMap;
