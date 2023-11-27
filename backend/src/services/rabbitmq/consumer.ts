import amqp from "amqplib";
import { LogModel } from "../../models/logModel";
import { config, rabbitMQConfig } from "../../config/config";
import "../database/database";

export const listen = async () => {
	// let connection;
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
	// finally{
	// 	// if (connection) await connection.close();
	// }
};
