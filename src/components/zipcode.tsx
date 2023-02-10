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
    // const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/; EXAMPLE
    // const re = /^\d{6}/; MINE
    // function to test zipcode is 6 digits? 
    // zipcode.test()
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
    <form onSubmit={handleSubmit}>
          <label htmlFor="zipcode" className="text-white">Enter your zipcode:
          <br />
          <input type="text" id="zipcode" name="zipcode" required value={zipcode} onChange={e => setZipCode(e.target.value)} />
          </label>
          <br />
          <button type="submit" className="rounded-full bg-white/10 px-10 py-3 hover:bg-white/20 my-10 text-white">Submit</button>
      </form>
    : (
      <NextPageButtonLink pageName="survey" msg="Click here to start the demographics survey." disabled={nextLinkDisabled}/>
    )
  }
    </div>
  )
 
}

export default ZipCode;