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
import { Ref, useEffect, useRef, useState } from "react";
import { Layer, LeafletMouseEvent } from "leaflet";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import { api } from "../utils/api";
import Link from "next/link";

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

interface GeoJSONElement {
  resetStyle: (element: any) => void;
}

const CensusTractMap: NextPage = () => {
  const [userCensusTract, setUserCensusTract] = useState<string | null>(null);
  const [censusTractComplete, setCensusTractComplete] = useState(false);
  const [disabled, setDisabled] = useState(true);

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
    });
    layer.on("mouseover", (e: LeafletMouseEvent) => {
      const featureProperties = feature.properties as FeatureProperties;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      e.target
        .setStyle({
          fillOpacity: 0.5,
        })
        .bindPopup(
          `Name: ${featureProperties["tractname"]} <br> Tract: ${featureProperties["name20"]} <br> Population: ${featureProperties["pop20"]}`,
          { autoPan: false }
        )
        .openPopup();
    });
    layer.on("mouseout", (e: LeafletMouseEvent) => {
      if (!geoJsonRef.current) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      (geoJsonRef.current as GeoJSONElement).resetStyle(e.target);
    });
    return null;
  };

  const getCensusTractFillColor = () => {
    return "#CCCCCC";
  };
  const censusTractStyle = (
    val: Feature<Geometry, { pop20: number }> | undefined
  ) => {
    if (!val) {
      return {};
    }
    return {
      fillColor: getCensusTractFillColor(),
      color: "#44475a",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.2,
    };
  };

  const updateUserCensusTract = api.user.addCensusTract.useMutation();
  const handleSubmit = () => {
    // TODO: Fix conditional
    updateUserCensusTract.mutate({ censusTract: userCensusTract ?? "" });
  };

  const searchKey = process.env.NEXT_PUBLIC_SEARCH_API;
  return (
    <div className="flex h-full flex-col items-center">
      <h1 className="mt-6 text-3xl font-bold text-white">
        Select Your Census Tract
      </h1>
      <p className="mt-6 w-3/5 text-center text-white">
        This information will be used for the purposes of reporting on
        demographic representation. This reporting ensures that our process
        seeks to hear from as many perspectives in our community as possible
      </p>
      <div className="my-4 overflow-visible rounded bg-white shadow-lg">
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
              style={(val: Feature<Geometry, { pop20: number }> | undefined) =>
                censusTractStyle(val)
              }
              onEachFeature={(feature, layer) => handleFeature(feature, layer)}
              ref={geoJsonRef as Ref<any>}
            />
          </MapContainer>
          <div className="items-center px-6 py-4">
            <p className="text-black">
              Use the ➕ and ➖ on the map to find the census tract area that
              contains your address
            </p>
          </div>
        </div>
      </div>
      {censusTractComplete ? (
        <>
          <h1 className="mb-2 text-white">
            <strong>{`You selected census tract is ${String(
              userCensusTract
            )}`}</strong>
          </h1>
          <Link className="flex flex-col" href={{ pathname: "./zipcode" }}>
            <button
              className="mb-4 self-center rounded-full bg-white/90 px-5 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
              onClick={() => handleSubmit()}
              disabled={disabled}
            >
              Continue
            </button>
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default CensusTractMap;
