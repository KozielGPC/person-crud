class IAddress {
	street: string;
	city: string;
	state: string;
	zipCode: string;
}

class IPhoneNumber {
	number: string;
	type: string;
}

export class CreateUserDto {
	firstName: string;
	lastName: string;
	addresses: IAddress[];
	dateOfBirth: Date;
	email: string;
	documentNumber: string;
	phoneNumbers: IPhoneNumber[];
}
