import { GrLinkNext } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
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
    <div className=" flex flex-col items-center justify-center">
      <h1 className="mb-12 text-lg font-semibold text-white md:mt-6 md:text-3xl ">
        Step 3: Confirm ZIP code
      </h1>
      <h2 className="mb-6 text-lg text-white md:mt-6 md:text-3xl">{msg}</h2>
      <div className="flex flex-col-reverse items-center justify-center gap-5">
        <button
          className="mb-1 flex flex-row items-center justify-center gap-1 
           rounded-full bg-white/70 px-4
          py-1 text-lg text-blue-darker  no-underline shadow-xl transition ease-in-out 
           hover:translate-y-1  hover:bg-white"
          onClick={() => handleRemoveZipCode()}
        >
          {" "}
          <IoMdArrowBack />
          Re-enter zip code
        </button>
        <Link href={{ pathname: "./survey" }}>
          <button
            className="mb-1 flex flex-row items-center justify-center gap-1 rounded-full border-2 border-dashed border-lightGreen bg-yellowGreen
          px-6 py-1 text-lg  text-blue-darker no-underline shadow-xl transition 
           ease-in-out  hover:translate-y-1 hover:bg-lightGreen"
            onClick={() => handleSubmit()}
          >
            Looks good! <GrLinkNext />
          </button>
        </Link>
      </div>
    </div>
  );
}
