import React from "react";

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
        Build upon and operationalize Hawai&#699;i&apos;s strategic framework
        for economic resilience.
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
        Cultivate communities of practice around Hawai&#699;i&apos;s regional
        economic development and resilience.
      </li>
    </ul>
  );
};

const WhatIsHierr = () => {
  return (
    <>
      <p className="mb-2 mt-4 text-center 2xl:text-lg">HIERR stands for </p>
      <h3 className="text-md pb-2 pl-2 text-center font-semibold 2xl:text-xl">
        Hawai&#699;i Economic Recovery and Resilience
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
          className="cursor-pointer text-blue-darker underline underline-offset-2 hover:text-green"
        >
          project website{" "}
        </a>
        to view recorded presentations, track progress, and discover engagement
        opportunities.
      </p>
    </>
  );
};

export default WhatIsHierr;
