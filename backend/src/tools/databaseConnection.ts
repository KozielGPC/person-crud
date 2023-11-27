import mongoose from "mongoose";
import { config } from "../config/config";

export const connectDB = async () => {
	try {
		await mongoose.connect(config.mongoURL);
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};
