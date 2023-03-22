"use client";

import { type NextPage } from "next";
import { api } from "../utils/api";
import { useCallback, useEffect, useState } from "react";
import SelectedZipCode from "./selectedzipcode";
import { useForm, SubmitHandler } from "react-hook-form";
import stateZipCodes from "../data/2020_Zip_Code_Data.json";
interface ZipCodeData {
  zipCode: string;
}

const ZipCode: NextPage = () => {
  const [zipcode, setZipCode] = useState<string | null>(null);
  const [zipCodeComplete, setZipCodeComplete] = useState(false);
  const removeUserZipCode = api.zipcode.removeZipCode.useMutation();
  const zipCodeDB = api.zipcode.getUserZipCode.useQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ZipCodeData>();

  // const onSubmit: SubmitHandler<ZipCodeData> = (data) => {
  //   setZipCodeComplete(true);
  // }

  const onSubmit = handleSubmit((data) => {
    setZipCodeComplete(true);
    setZipCode(data.zipCode);
  });

  useEffect(() => {
    if (zipCodeDB && zipCodeDB.data) {
      if (zipCodeDB.data.zipcode !== null) {
        setZipCodeComplete(true);
      }
      setZipCode(zipCodeDB.data?.zipcode);
    }
  }, [zipCodeDB.data?.zipcode]);

  // const handleSubmit = () => {
  //   setZipCodeComplete(true);
  // };

  const handleRemoveZipCode = useCallback(() => {
    if (zipcode === null) {
      setZipCodeComplete(false);
      return;
    }
    removeUserZipCode.mutate();
    setZipCode(null);
    setZipCodeComplete(false);
  }, []);

  const checkValidHawaiiZipCode = (val: string) => {
    return stateZipCodes.includes(Number(val));
  };
  return (
    <div className="flex h-screen flex-col items-center bg-[#3276AE]">
      {!zipCodeComplete ? (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form
          className="mt-6 overflow-hidden rounded bg-white px-8 py-6 shadow-lg"
          onSubmit={onSubmit}
        >
          <input
            className="form-input rounded"
            {...register("zipCode", {
              required: true,
              pattern: {
                value: /^[0-9]{5}/i,
                message: "The zip code must be 5 digits",
              },
              validate: {
                hawaiianZipCode: (v) =>
                  checkValidHawaiiZipCode(v) ||
                  "The zip code must be a valid Hawaiian zip code",
              },
            })}
          />
          <br />
          {errors.zipCode && (
            <>
              <p style={{ color: "red" }}>{errors.zipCode.message}</p>
            </>
          )}
          <input type="submit" />
        </form>
      ) : (
        // <form
        //   className="mt-6 overflow-hidden rounded bg-white px-8 py-6 shadow-lg"
        //   onSubmit={handleSubmit}
        // >
        //   <label htmlFor="zipcode" className="text-gray-700 mb-2 block text-sm">
        //     Enter your zipcode:
        //     <br />
        //     <input
        //       type="text"
        //       id="zipcode"
        //       name="zipcode"
        //       className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
        //       required
        //       value={zipcode === null ? "" : String(zipcode)}
        //       onChange={(e) => setZipCode(e.target.value)}
        //       style={{ color: "#4C4C4C" }}
        //       pattern="[0-9]{5}"
        //       title="The zipcode must be 5 digits."
        //     />
        //   </label>
        //   <br />
        //   <button
        //     type="submit"
        //     className="rounded-full border-blue-default bg-blue-default px-10 py-3 text-white no-underline transition hover:bg-blue-default hover:text-white"
        //     style={{ background: "#17364F" }}
        //   >
        //     Submit
        //   </button>
        // </form>
        <SelectedZipCode
          zipcode={String(zipcode)}
          msg={`The existing or selected zip code is: ${String(zipcode)}`}
          handleRemoveZipCode={handleRemoveZipCode}
        />
      )}
    </div>
  );
};

export default ZipCode;
