import { Request, Response } from "express";
import { JwtService } from "../services/jwt";
import { responseHandler } from "../tools/apiResponseHandler";

const authenticateKey = (req: Request, res: Response, next) => {
	let token: string = req.header("token");
	if (!token) {
		return responseHandler.unauthorizedResponse(
			res,
			"Header 'token' not found"
		);
	}

	try {
		JwtService.verifyToken(token);
		next();
	} catch (error) {
		return responseHandler.unauthorizedResponse(res, "Invalid API Key");
	}
};

export { authenticateKey };
