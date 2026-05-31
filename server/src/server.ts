import dotenv from "dotenv";
import app from "./app.ts";
import connectDB from "./config/connectDB.ts";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

const start = async () => {
      try {
            const client = await connectDB.connect();
            console.log("✅ PostgreSQL Connected");
            client.release();

            app.listen(PORT, () => {
                  console.log(`🚀 Server running on port ${PORT}`);
            });

      }
      catch (error) {
            if (error instanceof Error) {
                  console.error("❌ Failed to start server:", error.message);
            }
            else {
                  console.error("❌ Failed to start server:", error);
            }
            process.exit(1);
      }
};

start();