import express from "express";
import collegeData from "./Data/collegeData.json";
import cors from 'cors';
//get router

const app = express();
const port = 3000;

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options))
app.options('*', cors(options));

app.get("/colleges", (req, res) => {
  res.send(collegeData);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
