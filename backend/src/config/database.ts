import mongoose from "mongoose";
import config from "./config";

const db = async () => {
	try {
		await mongoose.connect(config.mongoURL);
		console.log("MongoDB connected...");
		return mongoose; 
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

export default db;
