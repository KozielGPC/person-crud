import mongoose from "mongoose";

export interface IPhoneNumber {
	_id?: mongoose.Types.ObjectId;
	number: string;
	type: string;
}
