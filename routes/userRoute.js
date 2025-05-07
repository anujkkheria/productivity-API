import express from "express";
import { Login, Signup } from "../Controller/userController.js";

const app = express();

const router = app.router;

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "you have successfully reached users",
  });
});

router.get("/get", (req, res) => {
  return res.status(200).send({
    message: "success",
  });
});

// RESTful
// /users/get?sort= - get all
// /users/get/:id - get specific user

router.post("/login", Login);
router.post("/Signup", Signup);

export default router;
