import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const dbStr = process.env.MONGO_URI as string;

    mongoose.set('strictQuery', true);
    await mongoose.connect(dbStr);
    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
