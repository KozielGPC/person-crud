import mongoose, { Schema } from "mongoose";

interface ILog extends Document {
	requestTime: Date;
	responseTime: Date;
	method: string;
	url: string;
	statusCode: number;
	userAgent: string;
	body: any;
	params: Object;
	query: Object;
}

const logSchema: Schema = new Schema({
	requestTime: { type: Date, required: true },
	responseTime: { type: Date, required: true },
	method: { type: String, required: true },
	url: { type: String, required: true },
	statusCode: { type: Number, required: true },
	userAgent: { type: String, required: false },
	body: { type: Object, required: true },
	params: { type: Object, required: true },
	query: { type: Object, required: true },
});

export const LogModel = mongoose.model<ILog>("Log", logSchema);
