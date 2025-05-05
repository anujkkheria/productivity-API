import bcrypt from "bcryptjs";
import "dotenv/config";
import { pool } from "../utils/DBConnection.js";
import { AppError } from "../utils/globalError.js";

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
  if (!email || !password) {
    next(new AppError("check the inputs", 400));
  }
  const result = await pool.query(queries.login, [email]);
  if (!result.rows) {
    next(new AppError("invalid credential", 404));
  }
  const isPassword = await bcrypt.compare(
    password,
    result.rows[0].password_hash
  );
  if (!isPassword) {
    next(new AppError("invalid credential"));
  }
  const { password_hash, ...details } = result.rows[0];
  return res.status(200).send({
    message: "success",
    details: details,
  });
};
