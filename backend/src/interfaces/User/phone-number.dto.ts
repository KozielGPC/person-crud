import mongoose from "mongoose";

export class IPhoneNumber {
	_id?: mongoose.Types.ObjectId;
	number: string;
	type: string;
}
