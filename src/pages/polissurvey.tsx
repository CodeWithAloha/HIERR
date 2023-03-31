import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Link from "next/link";

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
    <div className="flex h-max flex-col items-center bg-[#3276AE]">
      <h1 className="mt-6 text-3xl font-bold text-white">
        Please Fill Out The Pol.is Survey
      </h1>
      <div className="mt-6 mb-6 flex justify-between align-middle">
        <p className="mr-5 py-2 text-white">Return to polis survey selection</p>
        <Link href={"./polis"}>
          <button className="rounded-full bg-white/90 px-10 py-2 text-blue-default no-underline transition hover:bg-white hover:text-blue-darker">
            Back
          </button>
        </Link>
      </div>
      <div id="polis-container" style={{ width: "70vw", margin: "0 auto" }}>
        <div
          className="polis"
          data-conversation_id={surveyId}
          data-xid={userID}
        ></div>
      </div>
    </div>
  );
};

export default PolisSurvey;
