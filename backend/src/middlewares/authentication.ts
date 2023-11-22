import config from "../config/config";
import responseHandler from "../tools/apiResponseHandler";

const authenticateKey = (req, res, next) => {
	let api_key = req.header("x-api-key");

	if (api_key == config.API_KEY) {
		next();
	} else {
		return responseHandler.unauthorizedResponse(res, "Invalid API Key");
	}
};

export default authenticateKey;
