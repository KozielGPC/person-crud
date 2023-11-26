import { RedisClientType, createClient } from "redis";

let redisClient: RedisClientType;

(async () => {
	redisClient = createClient();

	redisClient.on("error", (error) => console.error(`Error : ${error}`));

	await redisClient.connect();
})();

export { redisClient };
