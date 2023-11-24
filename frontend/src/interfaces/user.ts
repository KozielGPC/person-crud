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