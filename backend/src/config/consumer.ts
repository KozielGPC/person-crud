import amqp from "amqplib";
const rabbitMQConfig = {
	connectionString: "amqp://username:password@localhost:5672",
	queue: "save_log",
};
import LogModel from "../models/logModel";
import connectDB from "../config/database";

export const listen = async () => {
	try {
		const connection = await amqp.connect(rabbitMQConfig.connectionString);
		const channel = await connection.createChannel();

		process.once("SIGINT", async () => {
			await channel.close();
			await connection.close();
		});

		await channel.assertQueue(rabbitMQConfig.queue, { durable: false });
		await channel.consume(
			rabbitMQConfig.queue,
			async (message) => {
				if (message) {
					console.log(
						" [x] Received '%s'",
						JSON.parse(message.content.toString())
					);

					await connectDB();

					const log = new LogModel(JSON.parse(message.content.toString()));
					await log.save();
				}
			},
			{ noAck: true }
		);

		console.log(" [*] Waiting for messages. To exit press CTRL+C");
	} catch (err) {
		console.warn(err);
	}
};
