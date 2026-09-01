import mongoose, { Connection } from "mongoose";

export default async function connectDB(): Promise<Connection> {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/company-site";

  mongoose.connection.on("connected", () => {
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
  });
  mongoose.connection.on("error", (err: Error) => {
    console.error("MongoDB connection error:", err.message);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  await mongoose.connect(uri);
  return mongoose.connection;
}
