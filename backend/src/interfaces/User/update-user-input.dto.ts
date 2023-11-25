import { IAddress } from "./address.dto";
import { IPhoneNumber } from "./phone-number.dto";

export class UpdateUserDto {
	firstName: string;
	lastName: string;
	addresses: IAddress[];
	dateOfBirth: Date;
	email: string;
	documentNumber: string;
	phoneNumbers: IPhoneNumber[];
}
