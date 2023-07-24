import React from "react";

const WhyCreateAccount = () => {
  return (
    <div className="flex flex-col items-center justify-center 2xl:top-60">
      <h3 className="text-md py-2 pl-2 text-center font-semibold text-white 2xl:text-xl">
        Why am I creating an account?
      </h3>
      <p className="mb-2 mt-4 text-center text-white 2xl:text-lg">
        Our engagement portal is set up to remember your progress by associating
        your responses with your email address. This means you don&apos;t have
        to complete everything in one sitting, but can come back to finish later
        without having to start over.
      </p>
    </div>
  );
};

export default WhyCreateAccount;
