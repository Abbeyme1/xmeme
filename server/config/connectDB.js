import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // if our sever is in development mode then make a local database
    // else use ATLAS
    if (process.env.NODE_ENV !== "production") {
      process.env.MONGO_URL = "mongodb://localhost:27017/xmeme";
    }
    // will help in making connection with MongoDB
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
