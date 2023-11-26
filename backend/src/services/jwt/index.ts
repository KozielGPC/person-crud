import jwt from "jsonwebtoken";
import { config } from "../../config/config";

export class JwtService {
	static generateToken(apiKey: string): string {
		const data = {
			apiKey,
		};
		return jwt.sign(data, config.JWT_SECRET, {
			expiresIn: config.JWT_EXPIRATION_TIME,
		});
	}

	static verifyToken(token: string): any {
		try {
			const decoded = jwt.verify(token, config.JWT_SECRET);
			return decoded;
		} catch (error) {
			throw new Error("Invalid API Key");
		}
	}
}
