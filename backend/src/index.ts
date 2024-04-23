// src/index.js
import express, { Express, Request, Response } from "express";
import { Mongo } from "./mongo";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const MyMongoClient = new Mongo();

app.get("/", async (req: Request, res: Response) => {
  const machines = await MyMongoClient.getAllMachines();
  console.log('machines:', machines);
  res.json(machines);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});