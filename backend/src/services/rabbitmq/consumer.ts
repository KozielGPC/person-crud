import amqp from "amqplib";
import { connectDB } from "../database/database";
import { LogModel } from "../../models/logModel";
import { config, rabbitMQConfig } from "../../config/config";

export const listen = async () => {
	try {
		const connection = await amqp.connect(config.RABBIT_MQ_URL);
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
