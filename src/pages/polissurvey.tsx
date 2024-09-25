import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../utils/api";
import Link from "next/link";
import LoggedInAs from "./loggedinas";
import { useSession } from "next-auth/react";
import { IoMdArrowBack } from "react-icons/io";
import PrevButton from "../components/PrevButton";
import PageHeader from "../components/PageHeader";

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
    <div className="flex h-full flex-col items-center">
      <PageHeader title="Step 4: Fill out the Pol.is survey" />
      <LoggedInAs email={sessionData?.user.email} />
      <div className="mb-6 mt-6 flex align-middle">
        <Link href={"./polis"} className="">
          <PrevButton text="Select New Polis Survey" />
        </Link>
      </div>
      <div id="polis-container" className="mx-auto mt-8 h-[80%] w-[80%]">
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
