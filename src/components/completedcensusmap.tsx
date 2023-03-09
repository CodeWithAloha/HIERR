import { NextPageButtonLink } from "../UI/NextPageButtonLink";

interface CompletedCensusMapProps {
  userSelectedCensusTract: string;
  handleRemoveCensusTract: () => void;
}
export default function CompletedCensusMap({
  userSelectedCensusTract,
  handleRemoveCensusTract,
}: CompletedCensusMapProps) {
  return (
    <>
      <h1 className="my-6 text-white">
        Census Tract Selected is: {userSelectedCensusTract}
      </h1>
      <NextPageButtonLink pageName="zipcode" msg="Click here to continue." />
      <button
        className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
        onClick={() => handleRemoveCensusTract()}
      >
        Click here to remove census tract info
      </button>
    </>
  );
}
