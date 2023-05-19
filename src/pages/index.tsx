import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { NextPageButtonLink } from "../UI/NextPageButtonLink";

import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import WhatIsHierr from "../components/WhatIsHierr";

const Login: NextPage = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleMoreInformation = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Head>
        <title>Welcome to HIERR</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"
        />
        <script
          src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
          integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
          async
        />
      </Head>
      <main className="mb-12  flex h-screen flex-col items-center  justify-center bg-spectrum bg-blend-screen ">
        <div className=" flex  flex-col items-center justify-center ">
          <h1
            className="pb-10 text-center text-5xl font-extrabold tracking-tight 
          text-white sm:text-[5rem]"
          >
            Welcome to HIERR
          </h1>

          <div
            className="flex flex-row items-center justify-center gap-2"
            onClick={toggleMoreInformation}
          >
            <p className="border-white py-6 text-2xl text-white underline-offset-4 hover:underline">
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
              className="relative mx-auto w-2/3 rounded-xl bg-white/50 p-10 text-lg ease-in-out  
            hover:bg-white/60 xl:w-1/2"
            >
              <button
                onClick={toggleMoreInformation}
                className="absolute top-4 right-4 text-4xl"
              >
                <IoCloseSharp />
              </button>
              <WhatIsHierr />
            </div>
          )}

          <AuthShowcase />

          <div className="flex flex-col items-center gap-2"></div>
        </div>
      </main>
    </>
  );
};

export default Login;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData ? (
          <NextPageButtonLink pageName="censusmap" msg="Click here to begin." />
        ) : null}
      </p>
      <button
        className="text-black mt-2 rounded-full bg-white/80 px-10 py-3 text-2xl  
        no-underline transition ease-in-out hover:bg-white"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in to begin"}
      </button>
    </div>
  );
};
