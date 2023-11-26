import { JwtService } from "../services/jwt";
import { redisClient } from "../services/redis/service";
import { responseHandler } from "../tools/apiResponseHandler";
import { config } from "../config/config";
import { AuthController } from "../controllers/authController";

jest.mock("../services/jwt");
jest.mock("../services/redis/service");
jest.mock("../tools/apiResponseHandler");

describe("AuthController", () => {
	let authController;

	beforeEach(() => {
		authController = new AuthController();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("validate", () => {
		it("should validate API key successfully", async () => {
			const req = { body: { apiKey: "validApiKey" } };
			const res = { send: jest.fn() };

			jest.spyOn(JwtService, "generateToken").mockReturnValue("fakeToken");
			jest.spyOn(redisClient, "set").mockResolvedValue("fakeToken");
			config.API_KEY = "validApiKey";

			await authController.validate(req, res).then(() => {
				expect(responseHandler.successResponseWithData).toHaveBeenCalledWith(
					res,
					"API KEY validation successful",
					{
						isValid: true,
						token: "fakeToken",
					}
				);
			});
		});

		it("should handle invalid API key", async () => {
			const req = { body: { apiKey: "invalidApiKey" } };
			const res = { send: jest.fn() };

			jest.spyOn(JwtService, "generateToken").mockReturnValue("fakeToken");
			jest.spyOn(redisClient, "set").mockResolvedValue(null);
			config.API_KEY = "validApiKey";

			await authController.validate(req, res);

			expect(responseHandler.successResponseWithData).toHaveBeenCalledWith(
				res,
				"API KEY validation failed",
				{
					isValid: false,
					token: "",
				}
			);
		});

		it("should handle errors during validation", async () => {
			const req = { body: { apiKey: "validApiKey" } };
			const res = { send: jest.fn() };

			jest.spyOn(JwtService, "generateToken").mockReturnValue("fakeToken");
			jest
				.spyOn(redisClient, "set")
				.mockRejectedValue(new Error("Mocked error"));
			config.API_KEY = "validApiKey";

			await authController.validate(req, res);

			expect(responseHandler.internalErrorResponse).toHaveBeenCalledWith(
				res,
				"Error validating API KEY"
			);
		});
	});
});
