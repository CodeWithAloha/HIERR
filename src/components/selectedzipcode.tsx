import { useState } from "react";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";
import { api } from "../utils/api";

interface SelectedZipCodeProps {
  msg: string;
  handleRemoveZipCode: () => void;
  zipcode: string;
}
export default function SelectedZipCode({
  msg,
  handleRemoveZipCode,
  zipcode,
}: SelectedZipCodeProps) {
  const postZipCodeResult = api.zipcode.postZipCode.useMutation();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const handleSubmit = () => {
    postZipCodeResult.mutate({ zipcode: String(zipcode) });
    setHasSubmitted(true);
  };

  if (zipcode === "") {
    return null;
  }

  return (
    <>
      {!hasSubmitted ? (
        <>
          <h1 className="my-6 text-white">{msg}</h1>
          <button
            className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
            onClick={() => handleSubmit()}
          >
            Submit Zip Code
          </button>
          <button
            className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
            onClick={() => handleRemoveZipCode()}
          >
            Click here to re-enter your zip code
          </button>
        </>
      ) : (
        <div className="mt-4">
          <NextPageButtonLink
            pageName="survey"
            msg="Click here to start the demographics survey."
          />
        </div>
      )}
    </>
  );
}
