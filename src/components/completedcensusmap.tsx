import { NextPageButtonLink } from "../UI/NextPageButtonLink";

interface CompletedCensusMapProps {
  userSelectedCensusTract: string;
}
export default function CompletedCensusMap({userSelectedCensusTract}: CompletedCensusMapProps ) {
  return (
    <>
      <h1 className="text-white my-6">Census Tract Selected is: {userSelectedCensusTract}</h1>
      <NextPageButtonLink pageName="zipcode" msg="Click here to continue." />
    </>
  )
}