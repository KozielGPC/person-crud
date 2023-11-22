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

export class UpdateUserDto {
	addresses: IAddress[];
	email: string;
	phoneNumbers: IPhoneNumber[];
}
