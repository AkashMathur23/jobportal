import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `connected to mongoDB Database ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`mongoDb Error ${error}`.red);
  }
};
export default connectDB;
