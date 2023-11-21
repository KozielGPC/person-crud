import connectDB from "../config/database";
import personModel from "../models/personModel";

const database = connectDB();
export class PersonController {
	// PersonModel: any;
	// constructor(PersonModel: any) {
	// 	this.PersonModel = PersonModel;
	// }

	// create(req, res) {
	// 	const person = new this.PersonModel(req.body);
	// 	person.save((err, data) => {
	// 		if (err) {
	// 			res.status(500).send(err);
	// 		} else {
	// 			res.status(201).send(data);
	// 		}
	// 	});
	// }

	// read(req, res) {
	// 	this.PersonModel.findById(req.params.id, (err, data) => {
	// 		if (err) {
	// 			res.status(500).send(err);
	// 		} else {
	// 			res.status(200).send(data);
	// 		}
	// 	});
	// }

	findMany(req, res) {
		// this.PersonModel.find((err, data) => {
		// 	if (err) {
		// 		res.status(500).send(err);
		// 	} else {
		// res.status(200).send(data);
		res.status(200).send([
			{
				name: "John",
				age: 30,
			},
		]);
		// 	}
		// });
	}

	// update(req, res) {
	// 	this.PersonModel.findByIdAndUpdate(
	// 		req.params.id,
	// 		req.body,
	// 		{ new: true },
	// 		(err, data) => {
	// 			if (err) {
	// 				res.status(500).send(err);
	// 			} else {
	// 				res.status(200).send(data);
	// 			}
	// 		}
	// 	);
	// }

	// delete(req, res) {
	// 	this.PersonModel.findByIdAndDelete(req.params.id, (err) => {
	// 		if (err) {
	// 			res.status(500).send(err);
	// 		} else {
	// 			res.status(200).send({ message: "Person successfully deleted" });
	// 		}
	// 	});
	// }
}
