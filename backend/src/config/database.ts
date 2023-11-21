import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
	try {
		await mongoose.connect(config.mongoURI);
		console.log("MongoDB connected...");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

export default connectDB;
