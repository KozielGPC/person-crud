export function validateCPF(documentNumber: string) {
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

export function validateCEP(zipCode: string) {
	var regex = /^\d{5}-?\d{3}$/;
	return regex.test(zipCode);
}

export function validatePhoneNumber(phoneNumber: string) {
	var regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
	return regex.test(phoneNumber);
}

export function validateEmail(email: string) {
	const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return regex.test(email);
}
