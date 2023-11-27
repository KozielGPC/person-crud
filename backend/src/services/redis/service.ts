import { RedisClientType, createClient } from "redis";
import { config } from "../../config/config";

let redisClient: RedisClientType;

(async () => {
	redisClient = createClient({
		url: config.REDIS_URL,
	});

	redisClient.on("error", (error) => console.error(`Error : ${error}`));

	await redisClient.connect();
})();

export { redisClient };
