import { api } from "../utils/api";
import Link from "next/link";

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
  const handleSubmit = () => {
    updateUserCensusTract.mutate({ censusTract: censusTract });
  };

  if (censusTract === "") {
    return null;
  }

  return (
    <>
      <h1 className="my-6 text-white">{msg}</h1>
      <Link href={{ pathname: "./zipcode" }}>
        <button
          className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
          onClick={() => handleSubmit()}
        >
          Submit Census Tract and continue to zip code
        </button>
      </Link>
      <button
        className="rounded-full bg-white/90 px-10 py-3 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
        onClick={() => handleRemoveCensusTract()}
      >
        Click here to remove census tract info
      </button>
    </>
  );
}
