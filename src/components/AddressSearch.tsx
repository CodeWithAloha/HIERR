/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/// <reference types="leaflet" />
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import ZipCodesGeojson from "../data/Zip_Codes.json";
import CensusTractGeojson from "../data/Census_Tracts.json";
import PlanningAreaGeojson from "../data/Statewide_Planning_Regions.json";
import DHHLGeojson from "../data/DHHL_WGS84.json";
import * as turf from "@turf/turf";
import { FeatureCollection, Feature, Polygon } from "geojson";
import * as ELG from "esri-leaflet-geocoder";
import Link from "next/link";
import { api } from "../utils/api";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import PageHeader from "./PageHeader";
import PageLayout from "./PageLayout";

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
  const [island, setIsland] = useState<string | null>(null);
  const [county, setCounty] = useState<string | null>(null);
  const [dhhlRegion, setDhhlRegion] = useState<string | null>(null);
  const [location, setLocation] = useState<Address | null>(null);
  const [censusTractComplete, setCensusTractComplete] =
    useState<boolean>(false);
  const [zipCodeComplete, setZipCodeComplete] = useState<boolean>(false);
  const [planningRegionComplete, setPlanningRegionComplete] =
    useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const apiToken = process.env.NEXT_PUBLIC_SEARCH_API;

  const censusTractDB = api.user.getCensusTract.useQuery();
  const zipCodeDB = api.zipcode.getUserZipCode.useQuery();
  const planningRegionDB = api.user.getPlanningRegion.useQuery();

  const updateUserCensusTract = api.user.addCensusTract.useMutation();
  const updateUserZipCode = api.zipcode.postZipCode.useMutation();
  const updateUserPlanningRegion = api.user.addPlanningRegion.useMutation();

  useEffect(() => {
    if (censusTractDB && censusTractDB.data) {
      if (censusTractDB.data.censustract !== null) {
        setCensusTract(censusTractDB.data?.censustract);
        setCensusTractComplete(true);
      }
    }
    if (zipCodeDB && zipCodeDB.data) {
      if (zipCodeDB.data.zipcode !== null) {
        setZipCode(zipCodeDB.data?.zipcode);
        setZipCodeComplete(true);
      }
    }
    if (planningRegionDB && planningRegionDB.data) {
      if (planningRegionDB.data.planningRegion !== null) {
        const [islandData, countyData, planningRegionData] =
          planningRegionDB.data.planningRegion.split(",");
        setIsland(islandData ?? "");
        setCounty(countyData ?? "");
        setPlanningRegion(planningRegionData ?? "");
        setPlanningRegionComplete(true);
      }
    }
  }, [
    censusTractDB.data?.censustract,
    zipCodeDB.data?.zipcode,
    planningRegionDB.data?.planningRegion,
  ]);

  useEffect(() => {
    if (censusTractComplete && zipCodeComplete && planningRegionComplete) {
      setComplete(true);
    }
  }, [censusTractComplete, zipCodeComplete, planningRegionComplete]);

  const boundaryBox = {
    xmin: -162.171387,
    ymin: 18.367807,
    xmax: -153.404297,
    ymax: 23.131708,
  };

  const handleSubmit = () => {
    if (!complete) {
      return;
    }
    const planningRegionDhhl = `${island ? island + "," : ""}${
      county ? county + "," : ""
    }${planningRegion ?? ""}${dhhlRegion === "Yes" ? "-DHHL" : ""}`;
    updateUserCensusTract.mutate({ censusTract: censusTract ?? "" });
    updateUserZipCode.mutate({ zipcode: zipCode ?? "" });
    updateUserPlanningRegion.mutate({
      planningRegion: planningRegionDhhl ?? "",
    });
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

    const getFeatureProperty = (
      geojson: FeatureCollection<Polygon>,
      propertyName: string,
      defaultValue = "Not Found",
      name?: string
    ): string => {
      let propertyValue = defaultValue;
      turf.featureEach(geojson, (currentFeature) => {
        if (turf.booleanPointInPolygon(point, currentFeature)) {
          if (name === "censustract") {
            setIsland((currentFeature.properties?.island as string) ?? "");
            setCounty((currentFeature.properties?.county as string) ?? "");
          }
          if (name === "dhhl") {
            propertyValue = "Yes";
          } else {
            propertyValue =
              (currentFeature.properties?.[propertyName] as string) ??
              defaultValue;
          }
        }
      });
      return propertyValue;
    };

    const zip = getFeatureProperty(
      ZipCodesGeojson as FeatureCollection<Polygon>,
      "geoid20"
    );
    const censusTract = getFeatureProperty(
      CensusTractGeojson as FeatureCollection<Polygon>,
      "name20",
      "Not Found",
      "censustract"
    );
    const featurePlanningRegion = getFeatureProperty(
      PlanningAreaGeojson as FeatureCollection<Polygon>,
      "Name"
    );
    const dhhlRegion =
      getFeatureProperty(
        DHHLGeojson as FeatureCollection<Polygon>,
        "Name",
        "Not Found",
        "dhhl"
      ) === "Not Found"
        ? "No"
        : "Yes";

    setZipCode(zip);
    setCensusTract(censusTract);
    setPlanningRegion(featurePlanningRegion);
    setDhhlRegion(dhhlRegion);
    setComplete(true);
  };

  return (
    <>
      <PageLayout>
        <PageHeader title="Step 1: Type in your address" />
        <section className="">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Enter address"
              className="input-bordered input w-full bg-white text-primary-content sm:text-sm md:text-lg"
            />
            {suggestions.length > 0 && (
              <ul
                className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md bg-white text-primary-content shadow-lg"
                role="listbox"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="cursor-pointer px-4 py-2 hover:bg-info"
                    role="option"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        <section className="rounded-md bg-white shadow-xl sm:m-4 sm:p-4 md:m-4 md:p-4 lg:m-6 lg:p-6">
          <div className="text-primary-content">
            <p className="card-title sm:text-sm md:text-lg">
              Your address will not be recorded, but will be used to return the
              following information commonly used in planning:
            </p>
            <section className="card-body sm:text-sm md:text-lg lg:text-xl">
              {zipCode && (
                <div className="flex items-center">
                  <span className="font-bold">ZIP Code:</span>
                  <span className="ml-2">{zipCode}</span>
                </div>
              )}
              {censusTract && (
                <div className="flex items-center">
                  <span className="font-bold">Census Tract:</span>
                  <span className="ml-2">{censusTract}</span>
                </div>
              )}
              {island && (
                <div className="flex items-center">
                  <span className="font-bold">Island:</span>
                  <span className="ml-2">{island}</span>
                </div>
              )}
              {county && (
                <div className="flex items-center">
                  <span className="font-bold">County:</span>
                  <span className="ml-2">{county}</span>
                </div>
              )}
              {planningRegion && (
                <div className="flex items-center">
                  <span className="font-bold">Planning Region:</span>
                  <span className="ml-2">
                    {planningRegion}
                    {dhhlRegion === "Yes" ? "-DHHL" : ""}
                  </span>
                </div>
              )}
            </section>
          </div>
        </section>
        <section className="">
          <div className="flex flex-row justify-center gap-5">
            <Link href={{ pathname: "./" }}>
              <PrevButton text="Home" />
            </Link>
            {complete ? (
              <Link href={{ pathname: "./survey" }}>
                <NextButton
                  text={"Next"}
                  onClick={() => handleSubmit()}
                  disabled={false}
                />
              </Link>
            ) : (
              <NextButton text={"Next"} disabled={true} />
            )}
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default AddressSearch;
