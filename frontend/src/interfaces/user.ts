export interface IAddress {
	_id?: unknown;
	street: string;
	city: string;
	state: string;
	zipCode: string;
}

export interface IPhoneNumber {
	_id?: unknown;
	number?: string;
	type?: string;
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
