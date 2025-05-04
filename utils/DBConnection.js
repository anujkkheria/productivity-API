import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_User,
  port: process.env.DB_port,
  max: 20,
  user: process.env.DB_User,
  password: process.env.DB_Password,
  database: process.env.database,
});
