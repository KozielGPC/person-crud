import mongoose from "mongoose";

export interface IAddress {
	_id?: mongoose.Types.ObjectId;
	street: string;
	city: string;
	state: string;
	zipCode: string;
}
