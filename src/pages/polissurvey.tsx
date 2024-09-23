import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../utils/api";
import Link from "next/link";
import ProgressBar from "../components/ProgressBar";
import LoggedInAs from "./loggedinas";
import { useSession } from "next-auth/react";
import { IoMdArrowBack } from "react-icons/io";

const PolisSurvey: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { surveyId } = router.query;
  const userID = api.user.getId.useQuery()?.data?.id;

  useEffect(() => {
    if (userID !== undefined && userID !== "") {
      const script = document.createElement("script");

      script.src = "https://pol.is/embed.js";
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [userID]);

  if (userID === "" || userID === undefined) {
    return (
      <>
        <h1 className="text-white">Loading Surveys</h1>
      </>
    );
  }
  return (
    <div className="flex h-full flex-col items-center shadow-xl">
      <h1 className="mb-4 mt-8 text-lg font-semibold text-white md:mt-6 md:text-3xl">
        Step 4: Fill out the Pol.is survey
      </h1>
      <ProgressBar completed={100} />
      <LoggedInAs email={sessionData?.user.email} />
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
      <div className="mb-6 mt-6 flex justify-between align-middle">
        <Link href={"./polis"} className="">
          {" "}
          <button className="btn-secondary btn">
            <IoMdArrowBack />
            Select New Polis Survey
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PolisSurvey;
