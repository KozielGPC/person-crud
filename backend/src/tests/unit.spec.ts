import {
	validateCEP,
	validateCPF,
	validateEmail,
	validatePhoneNumber,
} from "../tools/utils";

describe("Helper functions", () => {
	describe("validateCPF", () => {
		it("should return true for a valid CPF (123.456.789-09)", () => {
			expect(validateCPF("123.456.789-09")).toBe(true);
		});

		it("should return false for an invalid CPF (123.456.789-01)", () => {
			expect(validateCPF("123.456.789-01")).toBe(false);
		});
	});

	describe("validateCEP", () => {
		it("should return true for a valid CEP", () => {
			expect(validateCEP("12345-678")).toBe(true);
		});

		it("should return false for an invalid CEP (12345sdsd8)", () => {
			expect(validateCEP("12345sdsd8")).toBe(false);
		});
	});

	describe("validatePhoneNumber", () => {
		it("should return true for a valid phone number ((11) 1234-5678)", () => {
			expect(validatePhoneNumber("(11) 1234-5678")).toBe(true);
		});

        it("should return true for a valid phone number ((11) 91234-5678)", () => {
			expect(validatePhoneNumber("(11) 91234-5678")).toBe(true);
		});

		it("should return false for an invalid phone number (11 12345-6789)", () => {
			expect(validatePhoneNumber("11 12345-6789")).toBe(false);
		});

        it("should return false for an invalid phone number ((11) 123456789)", () => {
			expect(validatePhoneNumber("(11) 123456789")).toBe(false);
		});
	});

	describe("validateEmail", () => {
		it("should return true for a valid email (test@example.com)", () => {
			expect(validateEmail("test@example.com")).toBe(true);
		});

		it("should return false for an invalid email (fail@com)", () => {
			expect(validateEmail("fail@com")).toBe(false);
		});
	});
});
