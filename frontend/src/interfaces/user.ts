import mongoose from "mongoose";

export interface IAddress {
	street: string;
	city: string;
	state: string;
	zipCode: string;
}

export interface IPhoneNumber {
	_id?: mongoose.Types.ObjectId;
	number?: string;
	type?: string;
}

export interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	addresses: IAddress[];
	dateOfBirth: string;
	email: string;
	documentNumber: string;
	phoneNumbers: IPhoneNumber[];
}
