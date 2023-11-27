import { body } from "express-validator";
import {
	validateCEP,
	validateCPF,
	validateEmail,
	validatePhoneNumber,
} from "./utils";

function CreateUserValidator() {
	return [
		body("firstName")
			.notEmpty()
			.withMessage("First name is required")
			.isString()
			.withMessage("First name must be a string")
			.isLength({ max: 50 })
			.withMessage("First name must be less than 50 characters"),
		body("lastName")
			.notEmpty()
			.withMessage("Last name is required")
			.isString()
			.withMessage("Last name must be a string")
			.isLength({ max: 50 })
			.withMessage("Last name must be less than 50 characters"),
		body("email")
			.notEmpty()
			.withMessage("Email is required")
			.isString()
			.withMessage("Email must be a string")
			.custom((value) => validateEmail(value))
			.withMessage("Email must be a valid email address"),
		body("documentNumber")
			.notEmpty()
			.withMessage("Document number is required")
			.isString()
			.withMessage("Document number must be a string")
			.custom((value) => validateCPF(value))
			.withMessage("Document number must be a valid CPF"),
		body("addresses").isArray().withMessage("Addresses must be an array"),
		body("addresses.*.street")
			.notEmpty()
			.withMessage("Street is required")
			.isString()
			.withMessage("Street must be a string"),
		body("addresses.*.city")
			.notEmpty()
			.withMessage("City is required")
			.isString()
			.withMessage("City must be a string"),
		body("addresses.*.state")
			.notEmpty()
			.withMessage("State is required")
			.isString()
			.withMessage("State must be a string"),
		body("addresses.*.zipCode")
			.notEmpty()
			.withMessage("Zip code is required")
			.isString()
			.withMessage("Zip code must be a string")
			.custom((value) => validateCEP(value))
			.withMessage("Zip code must be a valid zip code"),
		body("phoneNumbers")
			.isArray()
			.withMessage("Phone numbers must be an array"),
		body("phoneNumbers.*.number")
			.notEmpty()
			.withMessage("Phone number is required")
			.isString()
			.withMessage("Phone number must be a string")
			.custom((value) => validatePhoneNumber(value))
			.withMessage(
				"Phone number type must be a valid phone number. Correct format: (99) 99999-9999 or (99) 9999-9999"
			),
		body("phoneNumbers.*.type")
			.notEmpty()
			.withMessage("Phone number type is required")
			.isString()
			.withMessage("Phone number type must be a string"),
	];
}

function UpdateUserValidator() {
	return [
		body("firstName")
			.notEmpty()
			.withMessage("First name is required")
			.isString()
			.withMessage("First name must be a string")
			.isLength({ max: 50 })
			.withMessage("First name must be less than 50 characters")
			.optional(),
		body("lastName")
			.notEmpty()
			.withMessage("Last name is required")
			.isString()
			.withMessage("Last name must be a string")
			.isLength({ max: 50 })
			.withMessage("Last name must be less than 50 characters")
			.optional(),
		body("email")
			.notEmpty()
			.withMessage("Email is required")
			.isString()
			.withMessage("Email must be a string")
			.custom((value) => validateEmail(value))
			.withMessage("Email must be a valid email address")
			.optional(),
		body("documentNumber")
			.notEmpty()
			.withMessage("Document number is required")
			.isString()
			.withMessage("Document number must be a string")
			.custom((value) => validateCPF(value))
			.withMessage("Document number must be a valid CPF")
			.optional(),
	];
}

export { CreateUserValidator, UpdateUserValidator };
