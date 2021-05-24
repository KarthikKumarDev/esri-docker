import express from "express";
import collegeData from "./Data/collegeData.json";

const app = express();
const port = 3000;
app.get("/colleges", (req, res) => {
  res.send(collegeData);
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
