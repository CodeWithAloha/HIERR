/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/// <reference types="leaflet" />
import React, { useRef, useState, ChangeEvent } from "react";
import ZipCodesGeojson from "../data/zipcodes.json";
import CensusTractGeojson from "../data/census-tracts_min.json";
import PlanningAreaGeojson from "../data/Plan_Areas.json";
import * as turf from "@turf/turf";
import { FeatureCollection, Feature, Polygon } from "geojson";
import ProgressBar from "./ProgressBar";
import * as ELG from "esri-leaflet-geocoder";

declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

interface AddressSuggestion {
  text: string;
}

interface AddressResponse {
  results: Address[];
}
interface Address {
  latlng: LatLng;
  text: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface GeocodeServiceResponse {
  suggestions: AddressSuggestion[];
}

const AddressSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [censusTract, setCensusTract] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState<string | null>(null);
  const [planningRegion, setPlanningRegion] = useState<string | null>(null);
  const [location, setLocation] = useState<Address | null>(null);
  const [complete, setComplete] = useState<boolean>(false);
  const apiToken = process.env.NEXT_PUBLIC_SEARCH_API;

  const boundaryBox = {
    xmin: -162.171387,
    ymin: 18.367807,
    xmax: -153.404297,
    ymax: 23.131708,
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 2) {
      if (!apiToken) {
        console.error("API token is not defined.");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const geocodeServiceResult = ELG.geocodeService({
        apikey: apiToken,
      });

      geocodeServiceResult
        .suggest()
        .text(value)
        .within([
          [boundaryBox.ymin, boundaryBox.xmin],
          [boundaryBox.ymax, boundaryBox.xmax],
        ])
        .run((err: any, response: GeocodeServiceResponse) => {
          if (err) {
            console.error(err);
            return;
          }
          if (
            response &&
            response.suggestions &&
            response.suggestions.length > 0
          ) {
            setSuggestions(
              response.suggestions.map((suggestion: AddressSuggestion) => ({
                text: suggestion.text,
              }))
            );
          }
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const geocodeService = ELG.geocodeService({
      apikey: apiToken,
    });
    const geocode = geocodeService.geocode();
    const geocodeText = geocode.text(suggestion.text);

    geocodeText.run((err: any, result: AddressResponse) => {
      if (err) {
        console.error(err);
        return;
      }
      if (
        !result.results ||
        result.results.length === 0 ||
        result.results[0] === undefined
      ) {
        console.error("No results found.");
        return;
      }

      const { lat, lng } = result.results[0].latlng;

      setLocation({ text: suggestion.text, latlng: result.results[0].latlng });
      setDemographicData(lat, lng);
      setSuggestions([]);
      setQuery(suggestion.text);
    });
  };

  const setDemographicData = (lat: number, lng: number) => {
    const point = turf.point([lng, lat]);
    let zip = "";
    let censusTract = "";
    let featurePlanningRegion = "";
    turf.featureEach(
      ZipCodesGeojson as FeatureCollection<Polygon>,
      (currentFeature, featureIndex) => {
        if (turf.booleanPointInPolygon(point, currentFeature)) {
          zip = (currentFeature.properties?.ZIP as string) ?? "Not Found";
        }
      }
    );
    turf.featureEach(
      CensusTractGeojson as FeatureCollection<Polygon>,
      (currentFeature, featureIndex) => {
        if (turf.booleanPointInPolygon(point, currentFeature)) {
          censusTract =
            (currentFeature.properties?.name20 as string) ?? "Not Found";
        }
      }
    );
    turf.featureEach(
      PlanningAreaGeojson as FeatureCollection<Polygon>,
      (currentFeature, featureIndex) => {
        if (turf.booleanPointInPolygon(point, currentFeature)) {
          featurePlanningRegion =
            (currentFeature.properties?.COMMUNITY_ as string) ?? "Not Found";
        }
      }
    );

    setZipCode(zip);
    setCensusTract(censusTract);
    setPlanningRegion(featurePlanningRegion);
    setComplete(true);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/2">
        <h1 className="text-lg font-semibold text-white md:mt-4 md:text-3xl">
          Step 1: Type in your address
        </h1>
        {complete ? (
          <ProgressBar completed={29} />
        ) : (
          <ProgressBar completed={2} />
        )}
        <div className="flex w-full flex-col justify-center">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter address"
            className="border-gray-300 mt-10 w-full rounded border p-2"
          />
          {suggestions.length > 0 && (
            <div className="border-gray-300 z-10 w-full rounded border bg-white">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="cursor-pointer bg-white p-2 hover:bg-gray/20"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.text}
                </div>
              ))}
            </div>
          )}
          <div className="mt-20 text-center">
            {zipCode && <p className="text-white">ZIP Code: {zipCode}</p>}
            {censusTract && (
              <p className="text-white">Census Tract: {censusTract}</p>
            )}
            {planningRegion && (
              <p className="text-white">Planning Region: {planningRegion}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressSearch;
