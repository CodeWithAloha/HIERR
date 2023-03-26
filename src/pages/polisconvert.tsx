// page for serving form for accepting raw Pol.is participant votes data and returning the data augmented with user zip code and census tract data
import { type NextPage } from "next";

const PolisConvert: NextPage = () => {
  return (
    <div>
      <h2>Polis Data Conversion</h2>
      <form method="post" action="/api/export" encType="multipart/form-data">
        <input type="file" id="polisdata" name="polisdata" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default PolisConvert;
