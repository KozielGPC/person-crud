import { body } from "express-validator";

function validateDocumentNumber(documentNumber: string) {
	documentNumber = documentNumber.replace(/[^\d]/g, "");

	if (documentNumber.length !== 11) {
		return false;
	}

	if (/^(\d)\1{10}$/.test(documentNumber)) {
		return false;
	}

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += parseInt(documentNumber.charAt(i)) * (10 - i);
	}
	let firstDigit = 11 - (sum % 11);

	if (firstDigit > 9) {
		firstDigit = 0;
	}
	if (parseInt(documentNumber.charAt(9)) !== firstDigit) {
		return false;
	}

	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += parseInt(documentNumber.charAt(i)) * (11 - i);
	}
	let secondDigit = 11 - (sum % 11);

	if (secondDigit > 9) {
		secondDigit = 0;
	}
	if (parseInt(documentNumber.charAt(10)) !== secondDigit) {
		return false;
	}

	return true;
}

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
			.custom((value) => {
				const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
				return regex.test(value);
			})
			.withMessage("Email must be a valid email address"),
		body("documentNumber")
			.notEmpty()
			.withMessage("Document number is required")
			.isString()
			.withMessage("Document number must be a string")
			.custom((value) => {
				return validateDocumentNumber(value);
			})
			.withMessage("Document number must be a valid CPF"),
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
			.withMessage("Zip code must be a string"),
		body("phoneNumbers.*.number")
			.notEmpty()
			.withMessage("Phone number is required")
			.isString()
			.withMessage("Phone number must be a string"),
		body("phoneNumbers.*.type")
			.notEmpty()
			.withMessage("Phone number type is required")
			.isString()
			.withMessage("Phone number type must be a string"),
	];
}

export { CreateUserValidator };
