import mongoose from "mongoose";
import { config } from "../../config/config";

export const connectDB = async () => {
	try {
		await mongoose.connect(config.mongoURL);
		return mongoose;
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};
