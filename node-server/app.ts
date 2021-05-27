import express from "express";
import collegeData from "./Data/collegeData.json";
import cors from "cors";
//get router

const app = express();
const port = 5000;

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));
app.options("*", cors(options));

const { Pool } = require("pg");
const { pgUser, pgHost, pgDatabase, pgPassword, pgPort } = require("./keys");

const pgClient = new Pool({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});
let dbInitFlag = true;
pgClient.on("error", () => console.log("Connection lost to Postgres"));

pgClient.on("connect", (client) => {
  client
    .query(
      "CREATE TABLE IF NOT EXISTS CollegeData (PlaceName VARCHAR (100), Latitude NUMERIC, Longitude NUMERIC)"
    )
    .then((res) => {
      if (dbInitFlag) {
        collegeData.forEach((college) => {
          client
            .query(
              `INSERT INTO CollegeData(PlaceName, Latitude, Longitude) VALUES ('${college["Place Name"]}', '${college.Latitude}', '${college.Longitude}');`
            )
            .catch((err) => console.error(err));
        });
      }
      dbInitFlag = false;
    })
    .catch((err) => console.error(err));
});

app.get("/colleges", async (req, res) => {
  const data = await pgClient.query("SELECT * FROM CollegeData");
  res.send(data.rows);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
