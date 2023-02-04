import { type NextPage } from "next"
import { NextPageButtonLink } from "../UI/NextPageButtonLink"

const ZipCode: NextPage = () => {
  return (
    <div className="bg-[#3276AE] flex flex-col items-center h-screen">
       <form action="/api/zipcode" method="post">
        <label htmlFor="zipcode">Enter your zipcode:</label>
        <input type="text" id="zipcode" name="zipcode" required />
        <button type="submit">Submit</button>
        <NextPageButtonLink pageName="survey" msg="Click here to start the demographics survey." />
      </form>
    </div>
  )
}

export default ZipCode;