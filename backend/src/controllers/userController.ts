import { validationResult } from "express-validator";
import connectDB from "../config/database";
import { CreateUserDto } from "../interfaces/User/create-user-input.dto";
import userModel, { IUser } from "../models/userModel";
import responseHandler from "../tools/apiResponseHandler";
import { Request, Response } from "express";
import { UpdateUserDto } from "../interfaces/User/update-user-input.dto";

export class UserController {
	async create(req: Request, res: Response) {
		try {
			await connectDB();
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const input: CreateUserDto = req.body;

			console.log(input);
			
			const newUser = new userModel(input);

			const savedUser = await newUser.save();
			return responseHandler.successCreateResponseWithData(
				res,
				"User created successfully",
				savedUser
			);
		} catch (error) {
			return responseHandler.internalErrorResponse(res, "Error creating user");
		}
	}

	async findMany(req: Request, res: Response) {
		try {
			await connectDB();
			const allUsers = await userModel.find();
			return responseHandler.successResponseWithData(
				res,
				"Users found",
				allUsers
			);
		} catch (error) {
			return responseHandler.internalErrorResponse(res, "Error finding users");
		}
	}

	async findOne(req: Request, res: Response) {
		try {
			await connectDB();
			const user = await userModel.findById(req.params.id);

			if (!user) {
				return responseHandler.notFoundResponse(res, "User not found");
			}
			return responseHandler.successResponseWithData(res, "User found", user);
		} catch (error) {
			return responseHandler.internalErrorResponse(res, "Error finding user");
		}
	}

	async update(req: Request, res: Response) {
		try {
			await connectDB();
			const input: UpdateUserDto = req.body;
			const updatedUser = await userModel.findByIdAndUpdate(
				req.params.id,
				{ $set: input },
				{ new: true }
			);
			return responseHandler.successResponseWithData(
				res,
				"User updated successfully",
				updatedUser
			);
		} catch (error) {
			return responseHandler.internalErrorResponse(
				res,
				"Error during user update"
			);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			await connectDB();
			const deletedUser = await userModel.findByIdAndDelete(req.params.id);
			if (!deletedUser) {
				return responseHandler.notFoundResponse(res, "User not found");
			}
			return responseHandler.successResponseWithData(
				res,
				"User deleted successfully",
				deletedUser
			);
		} catch (error) {
			return responseHandler.internalErrorResponse(
				res,
				"Error during user deletion"
			);
		}
	}
}
