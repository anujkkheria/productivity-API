import express from "express";
import { logger } from "./middlewares/logger.js";
import { pool } from "./utils/DBConnection.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
const app = express();

app.use(express.json());
app.use(logger);
app.use("/users", userRouter);
app.get("/", (req, res) => {
  return res.send("the api is running ");
});
app.get("/test", (req, res) => {
  pool();
  return;
});
app.listen("3000", (_req, _res) => {
  console.log("listening on port 3000");
});
