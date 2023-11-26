import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { v4 as uuid } from "uuid";
import { responseHandler } from "../../tools/apiResponseHandler";
import { Response } from "express";

export class JwtService {
	static generateToken(): string {
		const data = {
			id: uuid(),
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
