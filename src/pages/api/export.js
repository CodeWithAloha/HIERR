// API for consuming a participant-votes.csv from Pol.is export, joining with user's census tract and zip code data, and returning as a CSV

import nc from "next-connect";
import multiparty from "multiparty";
import ObjectsToCsv from "objects-to-csv";
import csv from "csv-parser";
import fs from "fs";

import { prisma } from "../../server/db";

// must not use built-in body parser so we can use multiparty for consuming form uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post(async (req, res) => {
  // TODO - add authentication / authorization so that only admins can access this, as it extracts census tract and zip code data for users

  const form = new multiparty.Form();

  // parse form input
  form.parse(req, async function (err, fields, files) {
    // if no polis form data in input, return 400
    if (!("polisdata" in files)) {
      res.status(400).end("No polisdata in post");
      return;
    }

    const polisDataFilePath = files.polisdata[0].path;

    var output = [];
    fs.createReadStream(polisDataFilePath)
      // use CSV parser for data
      .pipe(csv())
      .on("data", function (row) {
        if (row.xid != "") {
          // look up user's zip code and census tract based on xid
          const userPromise = prisma.user.findUnique({
            where: {
              xid: row.xid,
            },
            include: {
              zipcode: true,
            },
          });

          // add census tract and zipcode to the row if they are available
          const rowPromise = userPromise.then((user) => {
            row.censustract = "";
            row.zipcode = "";
            if (user != null) {
              row.censustract = user.censustract;
              if (user.zipcode != null) {
                row.zipcode = user.zipcode.zipcode;
              }
            }
            return row;
          });

          // push the row into an array to resolve during end callback
          output.push(rowPromise);
        } else {
          output.push(Promise.resolve(row));
        }
      })
      .on("end", function () {
        // wait for all promises to be completed
        Promise.all(output).then((resolved) => {
          // convert all rows back to CSV
          // TODO - remove numeral keys from object, so that they are not added as extra columns in export
          new ObjectsToCsv(resolved).toString().then((text) => {
            // write CSV to output stream
            res.setHeader("Content-Type", "text/csv");
            res.end(text);
          });
        });
      });
  });
});

export default handler;
