import Link from "next/link";
import { TiInputChecked } from "react-icons/ti";

interface NextPageButtonLinkProps {
  pageName: string;
  msg: string;
  disabled?: boolean;
  query?: { [key: string]: string };
  path?: string;
  text: string;
  successMessage: boolean;
  whiteDesignButton: boolean;
}

export const NextPageButtonLink = ({
  pageName,
  msg,
  disabled,
  query,
  path,
  text,
  successMessage,
  whiteDesignButton,
}: NextPageButtonLinkProps) => {
  const pathValue = path ? `${path}/${pageName}` : `./${pageName}`;
  const href = { pathname: pathValue, query: query };
  return (
    <div>
      {successMessage ? (
        <p
          className="  mx-auto  w-[80%]  -translate-y-8
        border border-dashed border-white p-2 text-center text-sm xl:w-1/2 2xl:text-lg"
        >
          {" "}
          <span>
            <TiInputChecked className="mx-auto text-4xl text-yellowGreen" />
          </span>{" "}
          {text}
        </p>
      ) : (
        <p
          className="  mx-auto  w-[80%]  -translate-y-8
        p-2 text-center text-sm xl:w-1/2 2xl:text-lg"
        >
          {text}
        </p>
      )}
      <Link href={href}>
        {whiteDesignButton ? (
          <button
            disabled={disabled}
            className="mb-1 rounded-full   bg-white/80 px-6
          py-2 text-lg text-blue-darker  no-underline shadow-xl transition ease-in-out 
           hover:translate-y-1  hover:bg-white "
          >
            {msg}
          </button>
        ) : (
          <button
            disabled={disabled}
            className="mb-1 rounded-full border-2 border-dashed border-lightGreen bg-yellowGreen px-6
          py-1 text-lg text-blue-darker  no-underline shadow-xl transition ease-in-out 
           hover:translate-y-1  hover:bg-lightGreen "
          >
            {msg}
          </button>
        )}
      </Link>
    </div>
  );
};
