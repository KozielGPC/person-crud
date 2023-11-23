import config from "../config/config";
import responseHandler from "../tools/apiResponseHandler";
import { Request, Response } from "express";

export class ApiKeyValidationController {
	async validate(req: Request, res: Response) {
		try {
			const input = req.query as { apiKey: string };

			const isValid = input?.apiKey === config.API_KEY;

			if (!isValid) {
				return responseHandler.successResponseWithData(
					res,
					"API KEY validation failed",
					{
						isValid: false,
					}
				);
			}
			return responseHandler.successResponseWithData(
				res,
				"API KEY validation successful",
				{
					isValid: true,
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
