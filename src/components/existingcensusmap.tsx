import { NextPageButtonLink } from "../UI/NextPageButtonLink";

interface ExistingCensusMapProps {
  existingCensusTract: string;
  handleRemoveCensusTract: () => void;
}
export default function ExistingCensusMap({
  existingCensusTract,
  handleRemoveCensusTract,
}: ExistingCensusMapProps) {
  return (
    <>
      <h1 className="text-white">
        User&apos;s existing census tract is: {existingCensusTract}
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
