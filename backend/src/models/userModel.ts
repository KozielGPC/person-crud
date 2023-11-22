import mongoose, { Document, Schema } from "mongoose";

interface IAddress {
	street: string;
	city: string;
	state: string;
	zipCode: string;
}

interface IPhoneNumber {
	number: string;
	type: string;
}

interface IUser extends Document {
	firstName: string;
	lastName: string;
	addresses: IAddress[];
	dateOfBirth: Date;
	email: string;
	documentNumber: string;
	phoneNumbers: IPhoneNumber[];
}

const addressSchema: Schema = new Schema({
	street: { type: String, required: true },
	city: { type: String, required: true },
	state: { type: String, required: true },
	zipCode: { type: String, required: true },
});

const phoneNumberSchema: Schema = new Schema({
	number: { type: String, required: true },
	type: { type: String, required: true },
});

const userSchema: Schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	addresses: [addressSchema],
	dateOfBirth: { type: Date, required: true },
	email: { type: String, required: true, unique: true },
	documentNumber: { type: String, required: true, unique: true },
	phoneNumbers: [phoneNumberSchema],
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
