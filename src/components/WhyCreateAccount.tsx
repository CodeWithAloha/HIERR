import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const TextBlock = () => {
  return (
    <>
      <h3 className="text-md py-2 pl-2 text-center font-semibold 2xl:text-xl">
        Why am I creating an account?
      </h3>
      <p className="mb-2 mt-4 text-center 2xl:text-lg">
        Our engagement portal is set up to remember your progress by associating
        your responses with your email address. This means you don&apos;t have
        to complete everything in one sitting, but can come back to finish later
        without having to start over.
      </p>
    </>
  );
};

const WhyCreateAccount = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleMoreInformation = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <div
        className="flex cursor-pointer flex-row items-center justify-center gap-2  hover:scale-[102%]"
        onClick={toggleMoreInformation}
      >
        <p
          className="text-md border-white py-1 text-white underline-offset-4 
             hover:text-lightGreen   2xl:text-xl"
        >
          Why am I creating an account?
        </p>
        {!showMore && (
          <div className="text-lg text-white">
            <BsChevronDown />
          </div>
        )}
      </div>

      {showMore && (
        <div
          className="xl:bottom-17 fixed bottom-[7.4rem] z-30
               w-[94%] animate-slide-in rounded-md
              border bg-white/80 p-4 pt-8 text-sm
              shadow-xl backdrop-blur-md 
              ease-in-out sm:bottom-[10.7rem]  sm:w-[94%]
              sm:p-4 
              md:bottom-[4rem] lg:bottom-[7rem] lg:w-[84%]
              lg:p-6 xl:w-[60%]
              2xl:bottom-[35%] 2xl:w-[40%]"
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

export default WhyCreateAccount;
