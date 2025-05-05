import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

 async function connectDB() {
  const url = process.env.MONGO_URI;
  console.log("🔗 Connecting to MongoDB with URI:", url);

  try {
    await mongoose.connect(url, {
      useNewUrlParser:    true,
      useUnifiedTopology: true,
    });
    console.log(" Connected to MongoDB Atlas");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
}
export default connectDB;