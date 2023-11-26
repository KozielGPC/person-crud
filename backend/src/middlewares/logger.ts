import { config } from "../config/config";
import { send } from "../services/rabbitmq/producer";

const logger = (req, res, next) => {
	req.timestamp = Date.now();

	res.on("finish", async () => {
		const responseTime = Date.now();
		const { method, url } = req;
		const userAgent = req.get("user-agent");
		const statusCode = res.statusCode;

		const logInput = {
			requestTime: req.timestamp,
			responseTime,
			method,
			url,
			statusCode,
			userAgent,
			body: req.body,
			params: req.params,
			query: req.query,
		};

		if (config.LOGGER== "ON") {
			console.log(logInput);

			await send(logInput);
		}
	});

	next();
};

export { logger };
