import { api } from "../utils/api";
import Link from "next/link";

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
  const handleSubmit = () => {
    postZipCodeResult.mutate({ zipcode: String(zipcode) });
  };

  if (zipcode === "") {
    return null;
  }

  return (
    <div className="justify-items-left relative top-1/3 flex flex-col">
      <h1 className="my-6 text-white">{msg}</h1>
      <Link href={{ pathname: "./survey" }}>
        <button
          className="mb-12 rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
          onClick={() => handleSubmit()}
        >
          Submit your zip code and start the demographics survey
        </button>
      </Link>
      <button
        className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
        onClick={() => handleRemoveZipCode()}
      >
        Click here to re-enter your zip code
      </button>
    </div>
  );
}
