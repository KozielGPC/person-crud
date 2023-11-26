import mongoose from "mongoose";

export class IAddress {
	_id?: mongoose.Types.ObjectId;
	street: string;
	city: string;
	state: string;
	zipCode: string;
}
