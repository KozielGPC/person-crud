import mongoose from "mongoose";
import { UserModel } from "../models/userModel";
import { connectDB } from "../tools/databaseConnection";
import { redisClient } from "../services/redis/service";
import { closeConnection } from "../services/rabbitmq/consumer";

export async function cleanDatabase() {
	try {
		await UserModel.deleteMany({});
		console.log("Database cleaned successfully");
	} catch (error) {
		console.error("Error cleaning database:", error);
	}
}

export const setup = () => {
	beforeAll(async () => {
		await connectDB();
		await cleanDatabase();
	});

	afterAll(async () => {
		await cleanDatabase();
		await mongoose.connection.close();
		await redisClient.disconnect();
		await closeConnection();
	});
};
