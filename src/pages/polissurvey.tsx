import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

const PolisSurvey: NextPage = () => {
  const router = useRouter();
  const { surveyId } = router.query;
  const [userID, setUserID] = useState<string>();
  const { xid } = api.user.retrieveXid.useQuery().data;
  const [pid, setPid] = useState<string>("");
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false);
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
      if (xid) {
        console.log("Database User XID: ", xid);
        setUserID(xid);
        localStorage.polisUserXID = xid;
      }
    }
  }, [xid]);

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
        params.append("xid", xid);
        params.append("conversation_id", String(surveyId));

        this.fetch("https://pol.is/api/v3/participationInit?" + params.toString())
          .then((response) => response.json())
          .then((data) => {
            const { ptpt: participant } = data;
            const { pid } = participant;
            setPid(pid);
            mergeUserIds.mutateAsync({
              xid: String(xid),
              pid: String(pid),
              sid: String(surveyId),
            });
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
