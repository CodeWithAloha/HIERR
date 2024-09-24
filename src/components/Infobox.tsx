import React from "react";
import { TiInputChecked } from "react-icons/ti";

interface InfoboxProps {
  greenCheck: boolean;
  message: string;
}

const Infobox = ({ greenCheck, message }: InfoboxProps) => {
  return (
    <>
      <p
        className="  m-2 mx-auto w-[80%] 
        border border-dashed border-white p-2 text-center text-sm xl:w-1/2 2xl:text-lg"
      >
        {greenCheck ? (
          <span>
            <TiInputChecked className="mx-auto text-4xl text-[#32AEA8]" />
          </span>
        ) : null}
        {message}
      </p>
    </>
  );
};

export default Infobox;
