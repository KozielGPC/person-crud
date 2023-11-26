import { Request, Response } from "express";
import { responseHandler } from "../tools/apiResponseHandler";
import { redisClient } from "../services/redis/service";
import { config } from "../config/config";
const authenticateKey = (req: Request, res: Response, next) => {
	let token: string = req.header("token");
	if (!token) {
		return responseHandler.unauthorizedResponse(
			res,
			"Header 'token' not found"
		);
	}

	try {
		redisClient.get(token).then((value) => {
			const isValid = value === config.API_KEY;
			if (!isValid) {
				return responseHandler.unauthorizedResponse(res, "Invalid API Key");
			}
			next();
		});
	} catch (error) {
		return responseHandler.unauthorizedResponse(res, "Invalid API Key");
	}
};

export { authenticateKey };
