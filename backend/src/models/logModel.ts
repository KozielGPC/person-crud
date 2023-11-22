import mongoose, { Document, Schema } from "mongoose";

const logSchema: Schema = new Schema({
	requestTime: { type: Date, required: true },
	responseTime: { type: Date, required: true },
	method: { type: String, required: true },
	url: { type: String, required: true },
	statusCode: { type: Number, required: true },
	userAgent: { type: String, required: true },
	body: { type: Object, required: true },
	params: { type: Object, required: true },
	query: { type: Object, required: true },
});

const LogModel = mongoose.model('Log', logSchema);

export default LogModel;