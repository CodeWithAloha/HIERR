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
import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { Layer, LeafletMouseEvent } from "leaflet";
import { api } from "../utils/api";
import SelectedCensusMap from "./selectedcensusmap";

interface LayerEventTarget {
  feature: {
    properties: {
      tractname: string;
      name20: string;
    };
  };
}

interface GeoJSONElement {
  resetStyle: (element: any) => void;
}

const CensusTractMap: NextPage = () => {
  const [userCensusTract, setUserCensusTract] = useState<string | null>(null);
  const [censusTractComplete, setCensusTractComplete] = useState(false);

  const removeUserCensusTract = api.user.removeCensusTract.useMutation();

  const censusTractDB = api.user.getCensusTract.useQuery();

  useEffect(() => {
    if (censusTractDB && censusTractDB.data) {
      if (censusTractDB.data.censusTractId !== null) {
        setCensusTractComplete(true);
      }
      setUserCensusTract(censusTractDB.data?.censusTractId);
    }
  }, [censusTractDB.data?.censusTractId]);

  const geoJsonRef = useRef();
  const handleFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    layer.on("click", (e: LeafletMouseEvent) => {
      const selectedCensusTract = (e.target as LayerEventTarget).feature
        .properties["name20"];
      setUserCensusTract(selectedCensusTract);
      setCensusTractComplete(true);
    });
    layer.on("mouseover", (e: LeafletMouseEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      e.target.setStyle({
        fillOpacity: 0.8,
      });
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

  const getCensusTractFillColor = (population2020: number) => {
    if (population2020 <= 2500) {
      return "#bd93f9";
    }
    if (population2020 > 2500 && population2020 < 5000) {
      return "#ffb86c";
    }
    if (population2020 > 5000 && population2020 < 10000) {
      return "#8be9fd";
    }
    return undefined;
  };
  const censusTractStyle = (
    val: Feature<Geometry, { pop20: number }> | undefined
  ) => {
    if (!val) {
      return {};
    }
    const pop20 = Number(val.properties.pop20);
    return {
      fillColor: getCensusTractFillColor(pop20),
      color: "#44475a",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.4,
    };
  };

  const handleRemoveCensusTract = useCallback(() => {
    removeUserCensusTract.mutate();
    setUserCensusTract(null);
    setCensusTractComplete(false);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center bg-blue-default">
      {censusTractComplete ? (
        <SelectedCensusMap
          msg={`Census Tract Selected is: ${String(userCensusTract)}`}
          handleRemoveCensusTract={handleRemoveCensusTract}
          censusTract={String(userCensusTract)}
        />
      ) : (
        <>
          <div className="my-6 overflow-hidden rounded bg-white shadow-lg">
            <div id="map" className="w-full">
              <MapContainer
                center={[21.43805, -157.985262]}
                zoom={11}
                scrollWheelZoom={true}
                style={{ height: "600px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSONComponent
                  data={CensusTractData as GeoJsonObject}
                  style={(
                    val: Feature<Geometry, { pop20: number }> | undefined
                  ) => censusTractStyle(val)}
                  onEachFeature={(feature, layer) =>
                    handleFeature(feature, layer)
                  }
                  ref={geoJsonRef as Ref<any>}
                />
              </MapContainer>
              <div className="items-center px-6 py-4">
                <p className="text-black">
                  Use the ➕ and ➖ on the map to find the census tract area
                  that contains your address
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CensusTractMap;
