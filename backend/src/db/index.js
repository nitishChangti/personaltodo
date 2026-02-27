import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";
import config from "../config/config.js";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.get("MONGODB_URL")}/${DB_NAME}`,
    );
    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection Failed", error.message);
    console.warn(
      "Please check your MongoDB connection string and ensure the database is running.",
    );
    process.exit(1); 
  }
};

export default connectDB;