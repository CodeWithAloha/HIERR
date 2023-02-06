'use client';

import { type NextPage } from "next"
import { NextPageButtonLink } from "../UI/NextPageButtonLink"
import { api } from "../utils/api";
import { useState } from "react";


const ZipCode: NextPage = () => {
  const [zipcode, setZipCode] = useState("");
  // This posts on every rerender and input. Ideally, it should only post when the user clicks submit
  // const postZipCodeResult = api.zipcode.postZipCode.useQuery({userId: "1", zipcode: zipcode});
  const postZipCodeResult = api.zipcode.postZipCode.useMutation();
  const handleSubmit = () => {
    // This throws the invalid hook location error
    postZipCodeResult.mutate({userId: "1", zipcode: zipcode})
    console.log("Posting result", postZipCodeResult)
  }
  return (
    <div className="bg-[#3276AE] flex flex-col items-center h-screen">
       <form onSubmit={handleSubmit}>
        <label htmlFor="zipcode">Enter your zipcode:
        <input type="text" id="zipcode" name="zipcode" required value={zipcode} onChange={e => setZipCode(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
        <NextPageButtonLink pageName="survey" msg="Click here to start the demographics survey." />
    </div>
  )
}

export default ZipCode;