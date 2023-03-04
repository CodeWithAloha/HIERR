import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

const PolisSurvey: NextPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;
  const [userID, setUserID] = useState<string>();
  const res = api.user.retrieveXid.useQuery();
  // const [userHasVoted, setUserHasVoted] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.polisUserXID !== "undefined" &&
      localStorage.polisUserXID !== undefined
    ) {
      setUserID(String(localStorage.polisUserXID));
      console.log("LocalStorage polisUserXID found:", localStorage.polisUserXID);
    } else {
      if (res.data) {
        const xid = res.data as string;
        console.log("Database User XID: ", xid);
        setUserID(xid);
        localStorage.polisUserXID = xid;
      }
    }
  }, [res.data]);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://pol.is/embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('message', function (event) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = event.data;
      if (!event.origin.match(/pol.is$/)) {
        return;
      }
      console.log("Message: ", data);
    })
  }, []);
      
  if (!userID) {
    return <div>Loading...</div>;
  } else {
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
  }
};

export default PolisSurvey;
