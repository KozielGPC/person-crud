import connectDB from "../config/database";
import { CreateUserDto } from "../interfaces/User/create-user-input.dto";
import userModel from "../models/userModel";
import responseHandler from "../tools/apiResponseHandler";

export class PersonController {
	PersonModel: any;
	constructor(PersonModel: any) {
		this.PersonModel = PersonModel;
	}

	async create(req, res) {
		try {
			const input: CreateUserDto = req.body;

			const newUser = new userModel(input);

			const savedUser = await newUser.save();
			return responseHandler.successResponseWithData(
				res,
				"User created successfully",
				savedUser
			);
		} catch (error) {
			return responseHandler.internalErrorResponse(res, "Error creating user");
		}
	}

	async findMany(req, res) {
		try {
			await connectDB();
			const allUsers = await userModel.find();
			return responseHandler.successResponseWithData(res, "Users found", allUsers);
		} catch (error) {
			return responseHandler.internalErrorResponse(res, "Error finding users");
		}
	}

	async update(req, res) {
		try {
			await connectDB();
			const updatedUser = await userModel.findOneAndUpdate(
				{ email: "john.doe@example.com" },
				{ $set: { age: 31 } },
				{ new: true } // Return the updated document
			);
		} catch (error) {
			return responseHandler.internalErrorResponse(res, "Error during user update");
		}
	}

	async delete(req, res) {
		try {
			await connectDB();
			const deletedUser = await userModel.findOneAndDelete({
				email: "john.doe@example.com",
			});
			if (!deletedUser) {
				return responseHandler.notFoundResponse(res, "User not found");
			}
			return responseHandler.successResponseWithData(
				res,
				"User deleted successfully",
				deletedUser
			);
		} catch (error) {
			return responseHandler.internalErrorResponse(res, "Error during user deletion");
		}
	}
}
