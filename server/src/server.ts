import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.ts";
import app from "./app.ts";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

const start = async () => {
      try {
            await connectMongoDB();
            app.listen(PORT, () => {
                  console.log(`Server running on port ${PORT} 🚀`);
            });
      }
      catch (error) {
            console.error("Failed to start server:", error);
            process.exit(1);
      }
};

start();

