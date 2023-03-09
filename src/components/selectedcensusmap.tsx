import { NextPageButtonLink } from "../UI/NextPageButtonLink";

interface SelectedCensusMapProps {
  msg: string;
  handleRemoveCensusTract: () => void;
}
export default function SelectedCensusMap({
  msg,
  handleRemoveCensusTract,
}: SelectedCensusMapProps) {
  return (
    <>
      <h1 className="my-6 text-white">{msg}</h1>
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
