import amqp from "amqplib";

const rabbitMQConfig = {
  connectionString: 'amqp://username:password@localhost:5672',
  queue: 'save_log'
 };
 

export const send = async (data) => {
	let connection;
	try {
		connection = await amqp.connect(rabbitMQConfig.connectionString);
		const channel = await connection.createChannel();

		await channel.assertQueue(rabbitMQConfig.queue, { durable: false });
		channel.sendToQueue(rabbitMQConfig.queue, Buffer.from(JSON.stringify(data)));
		console.log(" [x] Sent '%s'", data);
		await channel.close();
	} catch (err) {
		console.warn(err);
	} finally {
		if (connection) await connection.close();
	}
};
