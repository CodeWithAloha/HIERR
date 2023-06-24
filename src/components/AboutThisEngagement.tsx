import React from "react";

const AboutThisEngagementPortal = () => {
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

export default AboutThisEngagementPortal;
