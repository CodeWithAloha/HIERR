import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

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
      {/* TODO: Fix Styling here */}
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
