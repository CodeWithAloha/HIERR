"use client";

import { type NextPage } from "next";
import { api } from "../utils/api";
import { useCallback, useEffect, useState } from "react";
import SelectedZipCode from "./selectedzipcode";
import { useForm } from "react-hook-form";
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
        <>
          <h1 className="mt-6 text-3xl font-bold text-white">
            Please Enter Your Zip Code
          </h1>
          <p className="mt-6 w-3/5 text-center text-white">
            This information will be used for the purposes of reporting on
            demographic representation. This reporting ensures that our process
            seeks to hear from as many perspectives in our community as possible
          </p>
          <form
            className="mt-6 overflow-hidden rounded bg-white px-8 py-6 shadow-lg"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
            <input
              className="mt-5 cursor-pointer rounded-full border-2 border-blue-default px-5 py-1 hover:bg-blue-default hover:text-white"
              type="submit"
            />
          </form>
        </>
      ) : (
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
