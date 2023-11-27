import "dotenv/config";

export const config = {
	PORT: process.env.PORT,
	mongoURL: process.env.MONGO_URL,
	API_KEY: process.env.API_KEY,
	RABBIT_MQ_URL: process.env.RABBIT_MQ_URL,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
	LOGGER: process.env.LOGGER,
	REDIS_URL: process.env.REDIS_URL,
};

Object.entries(config).forEach(([key, value]) => {
	if (!value) {
		throw new Error(`Missing environment variable: ${key}`);
	}
});

export const rabbitMQConfig = {
	queue: "save_log",
};
