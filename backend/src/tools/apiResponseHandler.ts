import { Response } from "express";

class ApiResponseHandler {
	successResponse(res: Response, msg: string) {
		var data = {
			status: 1,
			message: msg,
		};
		return res.status(200).json(data);
	}

	successResponseWithData(res: Response, msg: string, data: unknown) {
		var resData = {
			status: 1,
			message: msg,
			data: data,
		};
		return res.status(200).json(resData);
	}

	internalErrorResponse(res: Response, msg: string) {
		var data = {
			status: 0,
			message: msg,
		};
		return res.status(500).json(data);
	}

	notFoundResponse(res: Response, msg: string) {
		var data = {
			status: 0,
			message: msg,
		};
		return res.status(404).json(data);
	}

	validationErrorWithData(res: Response, msg: string, data: unknown) {
		var resData = {
			status: 0,
			message: msg,
			data: data,
		};
		return res.status(400).json(resData);
	}

	unauthorizedResponse(res: Response, msg: string) {
		var data = {
			status: 0,
			message: msg,
		};
		return res.status(401).json(data);
	}
}

const responseHandler = new ApiResponseHandler();
export default responseHandler;
