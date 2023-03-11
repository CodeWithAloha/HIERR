import { useState } from "react";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";
import { api } from "../utils/api";

interface SelectedCensusMapProps {
  msg: string;
  handleRemoveCensusTract: () => void;
  censusTract: string;
}
export default function SelectedCensusMap({
  msg,
  handleRemoveCensusTract,
  censusTract,
}: SelectedCensusMapProps) {
  const updateUserCensusTract = api.user.addCensusTract.useMutation();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const handleSubmit = () => {
    updateUserCensusTract.mutate({ censusTract: censusTract });
    setHasSubmitted(true);
  };

  if (censusTract === "") {
    return null;
  }

  return (
    <>
      <h1 className="my-6 text-white">{msg}</h1>
      {!hasSubmitted ? (
        <>
          <button
            className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
            onClick={() => handleSubmit()}
          >
            Submit Census Tract
          </button>
          <button
            className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
            onClick={() => handleRemoveCensusTract()}
          >
            Click here to remove census tract info
          </button>
        </>
      ) : (
        <NextPageButtonLink pageName="zipcode" msg="Click here to continue." />
      )}
    </>
  );
}
