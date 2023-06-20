"use client";

import { type NextPage } from "next";
import { api } from "../utils/api";
import { useCallback, useEffect, useState } from "react";
import SelectedZipCode from "./selectedzipcode";
import { useForm } from "react-hook-form";
import stateZipCodes from "../data/2020_Zip_Code_Data.json";
import { GrLinkNext } from "react-icons/gr";
import { BiError } from "react-icons/bi";
// import ProgressBar from "./ProgressBar";
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
    <div className="flex h-screen flex-col items-center justify-center bg-spectrum2">
      {!zipCodeComplete ? (
        <>
          <h1
            className="mb-3 text-lg font-semibold text-white md:mt-6 md:text-3xl
        "
          >
            Step 2: Enter Your Zip Code
          </h1>
          {/* <ProgressBar completed={20} /> */}

          <form
            className="my-6 flex w-[60%] flex-col items-center justify-center overflow-hidden rounded px-8 py-6  md:w-1/2 xl:w-1/3"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={onSubmit}
          >
            <input
              className="form-input w-full rounded border outline-none focus:border-green"
              placeholder="Enter ZIP code"
              {...register("zipCode", {
                required: true,
                pattern: {
                  value: /^[0-9]{5}/i,
                  message: "The zip code must be 5 digits",
                },
                validate: {
                  hawaiianZipCode: (v) =>
                    checkValidHawaiiZipCode(v) ||
                    "The zip code must be a valid state zip code",
                },
              })}
            />
            <br />
            {errors.zipCode && (
              <>
                <p
                  className=" flex flex-row items-center justify-center 
                gap-1 whitespace-nowrap text-red drop-shadow-md"
                >
                  <BiError className="text-xl" /> {errors.zipCode.message}
                </p>
              </>
            )}
            <button
              className="mb-1 mt-4 flex flex-row items-center justify-center gap-1 rounded-full border-2 
              border-dashed border-lightGreen
            bg-yellowGreen px-6 py-1
          text-right text-lg text-blue-darker  no-underline shadow-xl transition ease-in-out 
           hover:translate-y-1  hover:bg-lightGreen"
              type="submit"
            >
              {" "}
              Submit <GrLinkNext />
            </button>
          </form>
          <p
            className="mx-auto mt-4 w-[80%] border border-dashed border-white p-1
        text-center text-sm text-white md:m-4 md:w-1/2 md:p-4 xl:w-1/3 2xl:text-lg "
          >
            This information will be used for the purposes of reporting on
            demographic representation. This reporting ensures that our process
            seeks to hear from as many perspectives in our community as
            possible.
          </p>
        </>
      ) : (
        <SelectedZipCode
          zipcode={String(zipcode)}
          msg={`Your selected zip code is ${String(zipcode)}`}
          handleRemoveZipCode={handleRemoveZipCode}
        />
      )}
    </div>
  );
};

export default ZipCode;
