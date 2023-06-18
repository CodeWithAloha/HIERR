import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const TextBlock = () => {
  return (
    <>
      <h3 className="text-md p-4 pl-2 text-center font-semibold 2xl:text-xl">
        About this Engagement Portal
      </h3>
      <p className="mb-2 mt-4 pb-4 2xl:text-lg">
        This engagement portal is designed to help our project team understand:{" "}
      </p>

      <ol className="ml-4 mb-2 list-decimal pb-4 2xl:text-lg">
        <li className="md:mb-2">
          Demographic information of those who participate in the project.
        </li>
        <li className="md:mb-2">
          What Hawai&#699;i residents value and envision for our State&apos;s
          economic future.
        </li>
        <li className="md:mb-2">
          Hardships faced by residents during the COVID-19 pandemic and economic
          shutdown.
        </li>
      </ol>
    </>
  );
};

const AboutThisEngagementPortal = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleMoreInformation = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <div
        className="flex cursor-pointer flex-row items-center justify-center gap-1"
        onClick={toggleMoreInformation}
      >
        <p
          className="text-md border-white py-1 text-white underline-offset-4 
            hover:underline 2xl:text-xl"
        >
          About this Engagement Portal
        </p>
        {!showMore && (
          <div className="text-xl text-white">
            <BsChevronDown />
          </div>
        )}
      </div>

      {showMore && (
        <div
          className=" fixed bottom-[6rem] z-30 w-[94%]
               animate-slide-in rounded-md border
              bg-white/80 p-2 pt-8 text-sm 
              shadow-xl backdrop-blur-md ease-in-out 
              sm:bottom-[8rem]  sm:w-[94%] 
              md:bottom-[2rem]
              lg:bottom-[4rem] lg:w-[84%] lg:p-4
              xl:bottom-12 xl:w-[70%]
              2xl:bottom-[26%] 2xl:w-[50%]"
        >
          <button
            onClick={toggleMoreInformation}
            className="absolute top-4 right-4 text-2xl lg:text-4xl"
          >
            <IoCloseSharp />
          </button>
          <TextBlock />
        </div>
      )}
    </>
  );
};

export default AboutThisEngagementPortal;
