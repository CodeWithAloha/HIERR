"use client";

import { type NextPage } from "next";
import { api } from "../utils/api";
import { useCallback, useEffect, useState } from "react";
import SelectedZipCode from "./selectedzipcode";

const ZipCode: NextPage = () => {
  const [zipcode, setZipCode] = useState<string | null>(null);
  const [zipCodeComplete, setZipCodeComplete] = useState(false);
  const removeUserZipCode = api.zipcode.removeZipCode.useMutation();
  const zipCodeDB = api.zipcode.getUserZipCode.useQuery();

  useEffect(() => {
    if (zipCodeDB && zipCodeDB.data) {
      setZipCode(zipCodeDB.data?.zipcode);
      if (zipCodeDB.data.zipcode !== null) {
        setZipCodeComplete(true);
      }
    }
  }, [zipcode, zipCodeDB]);

  const handleSubmit = () => {
    // postZipCodeResult.mutate({ zipcode: String(zipcode) });
    setZipCodeComplete(true);
  };

  const handleRemoveZipCode = useCallback(() => {
    removeUserZipCode.mutate();
    setZipCode("");
    setZipCodeComplete(false);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center bg-[#3276AE]">
      {!zipCodeComplete ? (
        <form
          className="mt-6 overflow-hidden rounded bg-white px-8 py-6 shadow-lg"
          onSubmit={handleSubmit}
        >
          <label htmlFor="zipcode" className="text-gray-700 mb-2 block text-sm">
            Enter your zipcode:
            <br />
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
              required
              value={zipcode === null ? "" : String(zipcode)}
              onChange={(e) => setZipCode(e.target.value)}
              style={{ color: "#4C4C4C" }}
              pattern="[0-9]{5}"
              title="The zipcode must be 5 digits."
            />
          </label>
          <br />
          <button
            type="submit"
            className="rounded-full border-blue-default bg-blue-default px-10 py-3 text-white no-underline transition hover:bg-blue-default hover:text-white"
            style={{ background: "#17364F" }}
          >
            Submit
          </button>
        </form>
      ) : (
        <SelectedZipCode
          zipcode={String(zipcode)}
          msg={`Is this zip code correct? ${String(zipcode)}`}
          handleRemoveZipCode={handleRemoveZipCode}
        />
      )}
    </div>
  );
};

export default ZipCode;
