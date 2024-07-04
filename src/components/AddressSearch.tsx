import React, { useRef, useState } from "react";
import { LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";

interface GoogleMapsResponseData {
  results: google.maps.places.PlaceResult[];
}

interface CensusTractData {
  result: {
    geographies: {
      "Census Tracts": {
        TRACT: string;
        NAME: string;
        BASENAME: string;
      }[];
    };
  };
}

const AddressSearch: React.FC = () => {
  const [address, setAddress] = useState("");
  const [censusTract, setCensusTract] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState<string | null>(null);
  const [planningRegion, setPlanningRegion] = useState<string | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const libraries: Libraries = ["places"];

  const fetchCensusTract = async (latitude: number, longitude: number) => {
    const url = `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${longitude}&y=${latitude}&benchmark=2020&vintage=2020&format=json`;

    try {
      const response = await fetch(url);
      const data = (await response.json()) as CensusTractData;
      console.log("Census Tract Data is:", data);
      if (
        data !== undefined &&
        data.result !== undefined &&
        data.result.geographies !== undefined
      ) {
        // Safely access the 'TRACT' property by checking if 'Census Tracts' and its first element exist
        setCensusTract(
          data.result.geographies["Census Tracts"]?.[0]?.["TRACT"] ??
            "Not Found"
        );
      }
    } catch (error) {
      console.error("Error fetching census tract data:", error);
    }
  };

  const handlePlaceChanged = async () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current?.getPlace();
      console.log("Place is:", place);
      if (place.formatted_address) {
        setAddress(place.formatted_address);
        console.log("Address is:", place.formatted_address);

        const location = place.geometry?.location;
        if (location) {
          const lat = location.lat();
          const lng = location.lng();
          console.log("Lat is:", lat);
          console.log("Lng is:", lng);

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
              }`
            );
            const data = (await response.json()) as GoogleMapsResponseData;
            console.log("Data is:", data);

            const addressComponents = data.results[0]?.address_components;
            console.log("Address components are:", addressComponents);
            const zipCodeComponent = addressComponents?.find(
              (component: google.maps.GeocoderAddressComponent) =>
                component.types.includes("postal_code")
            );
            await fetchCensusTract(lat, lng);

            setZipCode(
              zipCodeComponent ? zipCodeComponent.long_name : "Not found"
            );
          } catch (error) {
            console.error("Error fetching geocode data:", error);
          }
        }
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
    >
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={() => {
              handlePlaceChanged().catch(console.error);
            }}
          >
            <input
              type="text"
              placeholder="Search for an address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-gray-300 focus:ring-blue-500 focus:border-transparent w-96 rounded-md border p-2 shadow-sm focus:outline-none focus:ring-2"
            />
          </Autocomplete>
          <div className="mt-4 text-center">
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
    </LoadScript>
  );
};

export default AddressSearch;
