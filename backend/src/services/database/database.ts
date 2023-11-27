import mongoose from "mongoose";
import { config } from "../../config/config";

export default mongoose
	.connect(config.mongoURL)
	.then(() => {
		console.log("Database connected...");
	})
	.catch((err) => console.log(err));
