import React from "react";

const WhyCreateAccount = () => {
  return (
    <div className="flex flex-col items-center justify-center 2xl:top-60">
      <h3 className="2xl:text-md py-1  text-sm font-semibold text-white">
        Why am I creating an account?
      </h3>
      <div className="m-2 h-[.3px] w-1/2 bg-white/20"></div>
      <p className="2xl:text-md mb-2 mt-4 px-2 text-justify text-[.7rem]  text-white md:px-6">
        Our engagement portal is set up to remember your progress by associating
        your responses with your email address. This means you don&apos;t have
        to complete everything in one sitting, but can come back to finish later
        without having to start over.
      </p>
    </div>
  );
};

export default WhyCreateAccount;
