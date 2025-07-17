import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }
  return mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    dbName: "BlogContent",
  });
}

export default dbConnect;
