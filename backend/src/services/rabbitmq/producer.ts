import amqp from "amqplib";
import { config, rabbitMQConfig } from "../../config/config";

export const send = async (data) => {
	let connection;
	try {
		connection = await amqp.connect(config.RABBIT_MQ_URL);
		const channel = await connection.createChannel();

		await channel.assertQueue(rabbitMQConfig.queue, { durable: false });
		channel.sendToQueue(
			rabbitMQConfig.queue,
			Buffer.from(JSON.stringify(data))
		);
		console.log(" [x] Sent '%s'", data);
		await channel.close();
	} catch (err) {
		console.warn(err);
	} finally {
		if (connection) await connection.close();
	}
};
