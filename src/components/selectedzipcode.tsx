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
    <div className="relative top-1/3 flex flex-col">
      <h1 className="my-6 self-center text-white">
        <strong>{msg}</strong>
      </h1>
      <div className="flex gap-5">
        <button
          className="rounded-full bg-white/90 px-5 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
          onClick={() => handleRemoveZipCode()}
        >
          Re-enter your zip code
        </button>
        <Link href={{ pathname: "./survey" }}>
          <button
            className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
            onClick={() => handleSubmit()}
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
