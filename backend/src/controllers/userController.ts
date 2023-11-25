import { validationResult } from "express-validator";
import connectDB from "../config/database";
import { CreateUserDto } from "../interfaces/User/create-user-input.dto";
import { UserModel } from "../models/userModel";
import responseHandler from "../tools/apiResponseHandler";
import { Request, Response } from "express";
import { UpdateUserDto } from "../interfaces/User/update-user-input.dto";
import { UpdateUserPhoneNumbersDto } from "../interfaces/User/update-user-phone-numbers.dto";
import mongoose from "mongoose";

export class UserController {
	async create(req: Request, res: Response) {
		try {
			await connectDB();
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const input: CreateUserDto = req.body;

			const newUser = new UserModel(input);

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
			const allUsers = await UserModel.find();
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
			const user = await UserModel.findById(req.params.id);

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
			const user = await UserModel.findById(req.params.id);

			if (!user) {
				return responseHandler.notFoundResponse(res, "User not found");
			}

			return await UserModel.findByIdAndUpdate(
				req.params.id,
				{
					$set: {
						...input,
					},
				},
				{ new: true }
			)
				.then((data) => {
					return responseHandler.successResponseWithData(
						res,
						"User updated successfully",
						data
					);
				})
				.catch((error) => {
					if (error.code === 11000 || error.code === 11001) {
						return responseHandler.validationErrorResponse(
							res,
							"Duplicated email or document number"
						);
					} else if (error.name === "CastError") {
						return responseHandler.validationErrorResponse(
							res,
							"Some of the fields are invalid"
						);
					} else {
						return responseHandler.internalErrorResponse(
							res,
							"Error during user update"
						);
					}
				});
		} catch (error) {
			return responseHandler.internalErrorResponse(
				res,
				"Error during user update"
			);
		}
	}

	async updatePhoneNumbers(req: Request, res: Response) {
		try {
			await connectDB();
			const input: UpdateUserPhoneNumbersDto = req.body;

			const user = await UserModel.findById(req.params.id);

			if (!user) {
				return responseHandler.notFoundResponse(res, "User not found");
			}

			input.phoneNumbers.forEach((phoneNumber) => {
				phoneNumber._id = phoneNumber._id
					? phoneNumber._id
					: new mongoose.Types.ObjectId();
			});

			console.dir(input, { depth: null });
			return await UserModel.findByIdAndUpdate(
				req.params.id,
				{
					$set: {
						phoneNumbers: input.phoneNumbers,
					},
				},
				{ new: true }
			)
				.then((data) => {
					return responseHandler.successResponseWithData(
						res,
						"User phone numbers updated successfully",
						data
					);
				})
				.catch((error) => {
					return responseHandler.internalErrorResponse(
						res,
						"Error updating user phone numbers"
					);
				});
		} catch (error) {
			console.log(error);

			return responseHandler.internalErrorResponse(
				res,
				"Error updating user phone numbers"
			);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			await connectDB();
			const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
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
