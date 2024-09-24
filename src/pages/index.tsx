import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import React from "react";

import WhatIsHierr from "../components/WhatIsHierr";
import AboutThisEngagementPortal from "../components/AboutThisEngagement";
import WhyCreateAccount from "../components/WhyCreateAccount";
import InfoPopup from "../components/InfoPopup";
import LoggedInAs from "./loggedinas";
import { TiInputChecked } from "react-icons/ti";
import Link from "next/link";
import Infobox from "../components/Infobox";
import NextButton from "../components/NextButton";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to HIERR</title>
        <meta
          name="description"
          content="Share your voice to help shape Hawai&#699;i's resilient future."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="relative flex  h-screen flex-col items-center justify-center  
      overflow-hidden bg-bgBig"
      >
        <div
          className="3xl:top-96 fixed 
        flex flex-col items-center justify-center 2xl:top-60"
        >
          <h1
            className="mx-2 pb-5 text-center text-4xl 
            font-extrabold leading-none tracking-tight text-white
           md:text-6xl"
          >
            Welcome to the HIERR Project
          </h1>
          <h2
            className="mx-2 text-center text-2xl font-bold leading-none 
            tracking-tight
            text-white
            md:text-5xl lg:pb-16"
          >
            Engagement Portal
          </h2>
          <AuthShowcase />

          <div className="mt-4 flex flex-col items-center justify-center">
            <InfoPopup title="What is HIERR?" PopupInfo={WhatIsHierr} />
            <InfoPopup
              title="About this Engagement Portal"
              PopupInfo={AboutThisEngagementPortal}
            />
            <InfoPopup
              title="Why am I creating an account?"
              PopupInfo={WhyCreateAccount}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  const href = { pathname: `./address` };
  const loggedinText =
    "You are currently logged in. You can begin the survey now, and rest assured that all responses will remain anonymous. Please note that we do not store any email credentials. If you need to take a break, simply sign out, and your progress will be saved. When you return, remember to sign in using the same email address.";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData ? (
          <div>
            <Infobox message={loggedinText} greenCheck={true} />
            <Link href={href}>
              <NextButton text="Start the survey" />
            </Link>
          </div>
        ) : null}
      </p>
      <button
        className="btn-secondary btn"
        onClick={sessionData ? () => void handleSignOut() : () => void signIn()}
      >
        {sessionData ? "SIGN OUT" : "SIGN IN"}
      </button>
      <LoggedInAs email={sessionData?.user?.email} />
    </div>
  );
};
