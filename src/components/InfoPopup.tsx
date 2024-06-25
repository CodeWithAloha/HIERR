import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

interface InfoPopupProps {
  title: string;
  PopupInfo: React.FC;
}

const InfoPopup = ({ title, PopupInfo }: InfoPopupProps) => {
  const [showMore, setShowMore] = useState(false);

  const toggleMoreInformation = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <div
        className="flex cursor-pointer flex-row items-center justify-center gap-2 
         hover:scale-[102%]
        "
        onClick={toggleMoreInformation}
      >
        <p
          className="text-md border-white py-1 text-white underline-offset-4 
              hover:text-yellowGreen 2xl:text-xl"
        >
          {title}
        </p>
        {!showMore && (
          <div className="text-lg text-white">
            <BsChevronDown />
          </div>
        )}
      </div>

      {showMore && (
        <div
          className="md:bottom-22 lg:bottom-18 fixed bottom-2 z-[1500] w-[98%]
               animate-slide-in rounded-md 
              bg-white/90 p-1 text-sm 
              shadow-xl
              backdrop-blur-md ease-in-out sm:bottom-8 
              sm:w-[94%]  sm:p-2
              md:p-8 lg:w-[84%]
              xl:bottom-12 xl:w-[80%]
              2xl:bottom-20 2xl:w-[60%]"
        >
          <button
            onClick={toggleMoreInformation}
            /* prettier-ignore */
            className="absolute top-4 right-4 text-2xl lg:text-4xl"
          >
            <IoCloseSharp />
          </button>
          <PopupInfo />
        </div>
      )}
    </>
  );
};

export default InfoPopup;