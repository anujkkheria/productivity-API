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
  return res.send({ message: "success", details: result.rows });
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("check the inputs", 400));
  }
  console.log(email);

  const result = await pool.query(queries.login, [email]);

  if (result.rowCount < 1) {
    return next(new AppError("invalid credential", 404));
  }

  const { password_hash, ...details } = result.rows[0];
  const isPassword = await bcrypt.compare(
    password,
    result.rows[0].password_hash
  );
  if (!isPassword) {
    return next(new AppError("invalid credential"));
  }
  return res.status(200).send({
    message: "success",
    details: details,
  });
};
