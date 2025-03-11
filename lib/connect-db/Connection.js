import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}

let cachedClient = null;
let cachedDb = null;

export async function connectDB() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cachedDb = cachedClient.connection.db;
  return cachedDb;
}

