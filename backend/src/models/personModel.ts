import mongoose, { Document, Schema } from "mongoose";

interface IPerson extends Document {
	name: string;
	age: number;
	email: string;
}

const PersonSchema: Schema = new Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	email: { type: String, required: true },
});

const PersonModel = mongoose.model<IPerson>("Person", PersonSchema);

export default PersonModel;
