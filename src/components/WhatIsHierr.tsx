import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const Goals = () => {
  return (
    <ol className="ml-4 mb-2 list-decimal 2xl:text-lg">
      <li className="md:mb-2">
        Support competitive project proposals designed to address economic
        hardships experienced by residents during the COVID-19 pandemic.
      </li>
      <li className="md:mb-2">
        Recommend policies and programs to address economic vulnerabilities
        revealed during the COVID-19 pandemic.
      </li>
      <li className="md:mb-2">
        Build upon and operationalize Hawai&apos;i's strategic framework for
        economic resilience.
      </li>
    </ol>
  );
};

const ByTheEndOfThisProject = () => {
  return (
    <ul className="ml-4 mb-2 list-disc 2xl:text-lg">
      <li className="md:mb-2">
        Develop a series of information products grounded in resident
        experiences and values.
      </li>
      <li className="md:mb-2">
        Identify projects, programs, and funding opportunities aimed to improve
        economic resilience.
      </li>
      <li className="md:mb-2">
        Cultivate communities of practice around Hawai&apos;i's regional
        economic development and resilience.
      </li>
    </ul>
  );
};

const TextBlock = () => {
  return (
    <>
      <p className="mb-2 mt-4 text-center 2xl:text-lg">HIERR stands for </p>
      <h3 className="text-md pb-2 pl-2 text-center font-semibold 2xl:text-xl">
        Hawai&apos;i Economic Recovery and Resilience
      </h3>

      <div className="h-[1px] w-full bg-blue-darker/40 md:my-4"></div>
      <h2 className="text-md py-2 font-semibold 2xl:text-xl">
        Project Overview
      </h2>
      <p className="mb-2 2xl:text-lg">
        The State of Hawai&apos;i Office of Planning & Sustainable
        Development&apos;s (OPSD) Special Plans Branch was awarded a Statewide
        Planning Grant (SPG) funded by the U.S. Department of Commerce, Economic
        Development Administration (EDA) to develop an economic recovery and
        resiliency plan for Hawaiʻi. This project is designed to learn from the
        economic impacts and experiences of hardship associated with the
        COVID-19 pandemic to inform and enable actions toward a more resilient,
        equitable, and sustainable economy.
      </p>

      <h2 className="text-md pb-2 font-semibold 2xl:text-xl">Goals:</h2>
      <Goals />
      <h2 className="text-md pb-2 font-semibold 2xl:text-xl">
        By the end of this project, we will:
      </h2>
      <ByTheEndOfThisProject />
      <div className="h-[1px] w-full bg-blue-darker/40 md:my-4"></div>
      <p className="pt-2 text-center 2xl:text-lg">
        Visit our{" "}
        <a
          href="https://www.hierr.online/"
          className="cursor-pointer text-blue-darker underline underline-offset-2"
        >
          project website{" "}
        </a>
        to view recorded presentations, track progress, and discover engagement
        opportunities.
      </p>
    </>
  );
};

const WhatIsHierr = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleMoreInformation = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <div
        className="flex flex-row items-center justify-center gap-1 pt-10"
        onClick={toggleMoreInformation}
      >
        <p
          className="text-md border-white py-1 text-white underline-offset-4 
            hover:underline 2xl:text-xl"
        >
          What is HIERR?
        </p>
        {!showMore && (
          <div className="text-xl text-white">
            <BsChevronDown />
          </div>
        )}
      </div>

      {showMore && (
        <div
          className="md:bottom-22 lg:bottom-18 fixed bottom-2 z-30 w-[98%]
               animate-slide-in rounded-md 
              bg-white/80 p-1 text-sm 
              shadow-xl
              backdrop-blur-md ease-in-out sm:bottom-8 
              sm:w-[94%]  sm:p-2
              md:p-8 lg:w-[84%]
              xl:bottom-12 xl:w-[80%]
              2xl:bottom-20 2xl:w-[60%]"
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

export default WhatIsHierr;
