import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Link from "next/link";
import ProgressBar from "../components/ProgressBar";

const PolisSurvey: NextPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;
  // TODO - whereever in code the user object is initially stored in the database (I can't find anywhere that user.create is called to do this with Prisma),
  //   the a new UUID needs to be generated and stored in the xid field in the user table
  //   it is completely fine if the id and xid in the user table are the same.
  //   ideally, we would not have created a separate xid column in the user table, and would have just used the id column as the polis id
  // TODO - we need a database migration to add xids for any rows in the user table that are empty. any users who have logged in and don't have an xid value in the database will never work correctly (polis export will always break)
  const userID = api.api.user.getXID.useQuery().data.xid;

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://pol.is/embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="flex h-full flex-col items-center shadow-xl">
      <h1 className="mt-8 mb-4 text-lg font-semibold text-white md:mt-6 md:text-3xl">
        Step 6: Fill out the Pol.is survey
      </h1>
      <ProgressBar completed={100} />

      <div
        id="polis-container"
        className="mx-auto mt-8 h-[80%] w-[80%] overflow-y-scroll"
      >
        <div
          className="polis"
          data-conversation_id={surveyId}
          data-xid={userID}
        ></div>
      </div>
      <div className="mt-6 mb-6 flex justify-between align-middle">
        <Link
          href={"./polis"}
          className="rounded-full bg-white/90 px-10 py-2 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker"
        >
          {" "}
          Return to polis survey selection
        </Link>
      </div>
    </div>
  );
};

export default PolisSurvey;
