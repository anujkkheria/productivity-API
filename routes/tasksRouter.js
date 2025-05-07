import express from "express";
import { AddTasks, getTasksbyID } from "../Controller/tasksController.js";
const app = express();

const router = app.router;

router.get("/", (req, res, next) => {
  return res.status(200).send({ message: "you have reached Tasks route " });
});

router.get("/get/:id", getTasksbyID);

router.post("/addTask/:id", AddTasks);

export default router;
