import bcrypt from "bcryptjs";
import "dotenv/config";
import { pool, consoleTheCOnfig } from "../utils/DBConnection.js";

const queries = {
  getall: `select username,email,role from users`,
  Signup: `Insert into users(username, email, password_hash, role, created_at, updated_at) Values ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ) RETURNING id, username, email, role`,
  login: `SELECT email, username,  password_hash, role from users WHERE email  = $1 `,
};

export const Signup = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(queries.Signup, [
    username,
    email,
    passwordHash,
    role,
  ]);
  res.send({ message: "success", details: result.rows });
};
export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: "bad request check the inputs" });
  }
  const result = await pool.query(queries.login, [email]);
  console.log(!result.rows);
  const isPassword = await bcrypt.compare(
    password,
    result.rows[0].password_hash
  );
  if (!isPassword) {
    return res.status(404).send();
  }
  const { password_hash, ...details } = result.rows[0];
  return res.status(200).send({
    message: "success",
    details: details,
  });
};
