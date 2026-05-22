import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
      console.log("Backend Running 🚀");
});

export default app;