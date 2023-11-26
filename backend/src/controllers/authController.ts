import { config } from "../config/config";
import { JwtService } from "../services/jwt";
import { responseHandler } from "../tools/apiResponseHandler";
import { Request, Response } from "express";

export class AuthController {
	async validate(req: Request, res: Response) {
		try {
			const input = req.body as { apiKey: string };

			const isValid = input?.apiKey === config.API_KEY;

			if (!isValid) {
				return responseHandler.successResponseWithData(
					res,
					"API KEY validation failed",
					{
						isValid: false,
						token: "",
					}
				);
			}

			const token = JwtService.generateToken();

			return responseHandler.successResponseWithData(
				res,
				"API KEY validation successful",
				{
					isValid: true,
					token,
				}
			);
		} catch (error) {
			return responseHandler.internalErrorResponse(
				res,
				"Error validating API KEY"
			);
		}
	}
}
