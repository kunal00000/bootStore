import mongoose from "mongoose";

import { MONGODB_URI } from "../config";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (e) {
    console.log("MongoDB connection fail:" + e);
  }
};
