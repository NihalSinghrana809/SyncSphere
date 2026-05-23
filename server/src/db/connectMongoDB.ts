import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
      const uri = process.env.MONGO_URI;
      if (!uri) {
            throw new Error("MONGO_URI is not defined");
      }

      try {
            const conn = await mongoose.connect(uri);
            console.log(`MongoDB connected: ${conn.connection.host}`);
      }
      catch (error) {
            if (error instanceof Error) {
                  throw new Error(`Error connecting to MongoDB: ${error.message}`);
            }
            throw new Error("Error connecting to MongoDB: unknown error");
      }
}

export default connectMongoDB;