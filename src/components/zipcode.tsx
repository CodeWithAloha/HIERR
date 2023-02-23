'use client';

import { type NextPage } from "next"
import { NextPageButtonLink } from "../UI/NextPageButtonLink"
import { api } from "../utils/api";
import { useState } from "react";


const ZipCode: NextPage = () => {
  const [zipcode, setZipCode] = useState("");
  const [nextLinkDisabled, setNextLinkDisabled] = useState(true)
  const postZipCodeResult = api.zipcode.postZipCode.useMutation();
  const handleSubmit = () => {
    // TODO: Add zipcode validation here
    if(zipcode === "")
    {
      return;
    }
    setNextLinkDisabled(false)
    postZipCodeResult.mutate({zipcode: zipcode})
    console.log("Posting result", postZipCodeResult)
  }

  return (
<div className="bg-[#3276AE] flex flex-col items-center h-screen">
  {
    nextLinkDisabled ? 
    <form className="rounded overflow-hidden shadow-lg bg-white mt-6 px-8 py-6" onSubmit={handleSubmit}>
          <label htmlFor="zipcode" className="block text-gray-700 text-sm mb-2">Enter your zipcode:
          <br />
          <input type="text" id="zipcode" name="zipcode" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required value={zipcode} onChange={e => setZipCode(e.target.value)} />
          </label>
          <br />
          <button type="submit" className="rounded-full bg-blue-default text-white hover:bg-blue-default hover:text-white px-10 py-3 no-underline transition border-blue-default" style={{background: "#17364F"}}>Submit</button>
      </form>
    : (
      <div className="my-6">
        <NextPageButtonLink pageName="survey" msg="Click here to start the demographics survey." disabled={nextLinkDisabled}/>
      </div>
    )
  }
    </div>
  )
 
}

export default ZipCode;