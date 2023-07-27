// page for serving form for accepting raw Pol.is participant votes data and returning the data augmented with user zip code and census tract data
import { type NextPage } from "next";

import { useSession } from "next-auth/react";
import LoggedInAs from "./loggedinas";

const PolisConvert: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-white">Polis Data Conversion</h1>
      <LoggedInAs email={sessionData?.user.email} />
      {!sessionData ? (
        <p className="text-white">You are not signed in</p>
      ) : null}
      <br />
      <p className="text-white">
        Please select a participant-votes.csv file to upload, then click submit.
      </p>
      <div className="m-5">
        <form method="post" action="/api/export" encType="multipart/form-data">
          <input
            className="text-white"
            type="file"
            id="polisdata"
            name="polisdata"
          />
          <input
            className="cursor-pointer border-2 border-white p-2 text-white"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default PolisConvert;
