import { LogModel } from "../models/logModel";
import { connectDB } from "../services/database/database";
import { responseHandler } from "../tools/apiResponseHandler";
import { Request, Response } from "express";

export class LogController {
	async findMany(req: Request, res: Response) {
		try {
			await connectDB();
			const allLogs = await LogModel.find();
			return responseHandler.successResponseWithData(
				res,
				"Logs found",
				allLogs
			);
		} catch (error) {
			return responseHandler.internalErrorResponse(res, "Error finding logs");
		}
	}
}
