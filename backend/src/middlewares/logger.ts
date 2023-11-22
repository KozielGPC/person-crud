import LogModel from "../models/logModel";
import connectDB from "../config/database";

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

		console.log(logInput);

		await connectDB();

		const log = new LogModel(logInput);
		log.save();
	});

	next();
};

export default logger;
