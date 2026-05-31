import { Pool } from "pg";
import dotenv from "dotenv";

const connectDB = new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: process.env.POSTGRES_PASSWARD,
      port: 5432,
});

export default connectDB;