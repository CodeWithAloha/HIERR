// page for serving form for accepting raw Pol.is participant votes data and returning the data augmented with user zip code and census tract data
import { type NextPage } from "next";

import { useSession } from "next-auth/react";

const PolisConvert: NextPage = () => {

  const { data: sessionData } = useSession();

  return (
    <div>
      <h2>Polis Data Conversion</h2>
      {sessionData ? "You are signed in" : "You are not signed in"}<br />
      Please select a participant-votes.csv file to upload, then click submit.<br />
      <form method="post" action="/api/export" encType="multipart/form-data">
        <input type="file" id="polisdata" name="polisdata" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default PolisConvert;
