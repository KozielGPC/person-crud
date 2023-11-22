import { body } from "express-validator";

function CreateUserValidator() {
	return [
		body("firstName").notEmpty().withMessage("First name is required"),
		body("lastName").notEmpty().withMessage("Last name is required"),
		body("email").isEmail().withMessage("Email must be a valid email address"),
		body("documentNumber")
			.notEmpty()
			.withMessage("Document number is required"),
		body("addresses.*.street").notEmpty().withMessage("Street is required"),
		body("addresses.*.city").notEmpty().withMessage("City is required"),
		body("addresses.*.state").notEmpty().withMessage("State is required"),
		body("addresses.*.zipCode").notEmpty().withMessage("Zip code is required"),
		body("phoneNumbers.*.number")
			.notEmpty()
			.withMessage("Phone number is required"),
		body("phoneNumbers.*.type")
			.notEmpty()
			.withMessage("Phone number type is required"),
	];
}

export { CreateUserValidator };
