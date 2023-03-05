import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

const PolisSurvey: NextPage = () => {
  const router = useRouter();
  const { surveyId } = router.query; // This is the sid, unique to a given survey
  const [userID, setUserID] = useState<string>(""); // This is the same as the XID, unique to a given user
  const [pid, setPid] = useState<string>(""); // This is the participant ID (pid), unique only to a given survey
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false);

  const xidData = api.user.retrieveXid.useQuery();
  const mergeUserIds = api.user.mergeUserIds.useMutation();

  useEffect(() => {
    if (
      localStorage.polisUserXID !== "undefined" &&
      localStorage.polisUserXID !== undefined
    ) {
      setUserID(String(localStorage.polisUserXID));
      console.log(
        "LocalStorage polisUserXID found:",
        localStorage.polisUserXID
      );
    } else {
      if (xidData) {
        const xid = xidData.data;
        console.log("Database User XID: ", xid);
        setUserID(xid);
        localStorage.polisUserXID = xid;
      }
    }
  }, [xidData]);

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
    window.addEventListener("message", function (event) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = event.data;
      if (!event.origin.match(/pol.is$/)) {
        return;
      }
      console.log("Message: ", data);

      if (data.type === "vote" && !userHasVoted) {
        console.log("User has voted for the first time!");

        const params = new URLSearchParams();
        params.append("xid", userID);
        params.append("conversation_id", String(surveyId));
        params.append("pid", "mypid"); // Seriously, this is the way to self-get a pid

        this.fetch("https://pol.is/api/v3/participationInit?" + params.toString())
          .then((response) => response.json())
          .then((data) => {
            console.log("Participation Init:", data)
            const { ptpt: participant } = data;
            const { pid } = participant;
            setPid(pid);
            mergeUserIds.mutateAsync({
              xid: String(userID),
              pid: String(pid),
              sid: String(surveyId),
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        setUserHasVoted(true);
      }
    });
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
