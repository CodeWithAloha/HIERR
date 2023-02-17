import { NextPageButtonLink } from "../UI/NextPageButtonLink";

interface ExistingCensusMapProps {
  existingCensusTract: string;
}
export default function ExistingCensusMap({existingCensusTract}: ExistingCensusMapProps ) {
  return (
    <>
      <h1 className="text-white">User's existing census tract is: {existingCensusTract}</h1>
      <NextPageButtonLink pageName="zipcode" msg="Click here to continue." />
    </>
  )
}