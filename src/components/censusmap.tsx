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
import { NextPageButtonLink } from "../UI/NextPageButtonLink";
import { Ref, useRef, useState } from "react";
import { Layer, LeafletMouseEvent } from "leaflet";
import { api } from "../utils/api";
import CompletedCensusMap from "./completedcensusmap";
import ExistingCensusMap from "./existingcensusmap";

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
  const [userCensusTract, setUserCensusTract] = useState("");
  const updateUserCensusTract = api.user.addCensusTract.useMutation();
  const [existingCensusTractId, setExistingCensusTractId] = useState(
    api.user.getCensusTract.useQuery().data?.censusTractId
  );

  const geoJsonRef = useRef();
  const handleFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    layer.on("click", (e: LeafletMouseEvent) => {
      const selectedCensusTract = (e.target as LayerEventTarget).feature
        .properties["name20"];
      setUserCensusTract(selectedCensusTract);
      updateUserCensusTract.mutate({ censusTract: selectedCensusTract });
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

  return (
		<div className='flex h-screen flex-col items-center bg-[#3276AE]'>
			{existingCensusTractId ? (
				<ExistingCensusMap existingCensusTract={existingCensusTractId} />
			) : userCensusTract ? (
				<CompletedCensusMap userSelectedCensusTract={userCensusTract} />
			) : (
				<>
					<h1 className='mt-4 w-3/4 items-center pb-5 pt-5 text-3xl text-white'>
						Please select the census tract area where you reside
						<p className='text-xl text-white'>
							Use the ➕ and ➖ on the map to find your tract
						</p>
					</h1>
					<div
						id='map'
						className='w-3/4 rounded-sm border-8 border-solid border-gray'>
						<MapContainer
							center={[21.43805, -157.985262]}
							zoom={11}
							scrollWheelZoom={true}
							style={{ height: '800px' }}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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
					</div>
				</>
			)}
		</div>
	)
};

export default CensusTractMap;
