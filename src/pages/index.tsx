import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import React from "react";

import WhatIsHierr from "../components/WhatIsHierr";
import AboutThisEngagementPortal from "../components/AboutThisEngagement";
import WhyCreateAccount from "../components/WhyCreateAccount";
import LoggedInAs from "./loggedinas";
import Link from "next/link";
import Infobox from "../components/Infobox";
import NextButton from "../components/NextButton";
import InfoModal from "../components/InfoModal";

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
      <main className="">
        <div className="flex flex-col sm:mt-4 md:mt-6 lg:mt-8">
          <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-2xl">
            Welcome to the HIERR Project
          </h1>
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-xl">
            Engagement Portal
          </h2>
          <AuthShowcase />

          <div className="flex flex-col items-center gap-2 sm:m-2 md:m-4 lg:m-6">
            <InfoModal title="What is HIERR?">
              <WhatIsHierr />
            </InfoModal>
            <InfoModal title="About this Engagement Portal">
              <AboutThisEngagementPortal />
            </InfoModal>
            <InfoModal title="Why am I creating an account?">
              <WhyCreateAccount />
            </InfoModal>
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
    // <div className="flex flex-col items-center justify-center gap-4">
    <div className="flex flex-col items-center gap-4">
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
        className="btn-secondary btn text-white"
        onClick={sessionData ? () => void handleSignOut() : () => void signIn()}
      >
        {sessionData ? "SIGN OUT" : "SIGN IN"}
      </button>
      <LoggedInAs email={sessionData?.user?.email} />
    </div>
  );
};
