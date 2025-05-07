import { Pool } from "pg";
import "dotenv/config";

const config = {
  host: process.env.host,
  port: process.env.DB_port,
  max: 20,
  user: process.env.DB_User,
  password: process.env.DB_Password,
  database: process.env.database,
};
export const pool = new Pool(config);

export const dbInit = async() => pool.connect()

export const consoleTheCOnfig = () => console.log(config);
