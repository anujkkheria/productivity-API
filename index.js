import express from "express";
import { logger } from "./middlewares/logger.js";
import { ErrorHandler } from "./middlewares/ErrorHandler.js";
import { dbInit, pool } from "./utils/DBConnection.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
const app = express();


async function init() {
  await dbInit()

  app.use(express.json());
  app.use(logger);
  app.use("/users", userRouter);
  app.get("/", (req, res) => {
    return res.send("ok ${Date}");
  });
  app.get("/health", async (req, res) => {
    const r = await pool.query("SELECT 1;")
    res.send("ok")
  });
  
  app.use(ErrorHandler);

  app.listen("3000", (_req, _res) => {
    console.log("listening on port 3000");
  });
}
init()
