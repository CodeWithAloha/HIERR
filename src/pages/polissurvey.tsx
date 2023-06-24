import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Link from "next/link";
import ProgressBar from "../components/ProgressBar";

const PolisSurvey: NextPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;
  const [userID, setUserID] = useState<string>();
  const xidDataDB = api.user.getXID.useQuery();

  useEffect(() => {
    if (xidDataDB.data && xidDataDB.data.xid !== null) {
      setUserID(String(xidDataDB.data.xid));
      localStorage.polisUserXID = String(xidDataDB.data.xid);
    } else if (
      localStorage.polisUserXID !== "undefined" &&
      localStorage.polisUserXID !== undefined
    ) {
      setUserID(String(localStorage.polisUserXID));
      console.log("Existing polisUserXID found:", localStorage.polisUserXID);
    } else {
      console.log("Assigning new polisUserXID:", userID);
      localStorage.polisUserXID = userID;
    }
  }, [userID, xidDataDB.data?.xid]);

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
      <ProgressBar completed={90} />

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
