import { validateCEP, validateCPF, validateEmail, validatePhoneNumber } from "./validators";

export const validateEmailInput = (rule: any, value: string) => {
    if (!validateEmail(value)) {
        return Promise.reject("Invalid email input");
    }
    return Promise.resolve();
};

export const validatePhoneNumberInput = (rule: any, value: string) => {
    if (!validatePhoneNumber(value)) {
        return Promise.reject("Invalid phone number input");
    }
    return Promise.resolve();
};


export const validateDocumentNumberInput = (rule: any, value: string) => {
    if (!validateCPF(value)) {
        return Promise.reject("Invalid document number input");
    }
    return Promise.resolve();
};

export const validateZipCodeInput = (rule: any, value: string) => {
    if (!validateCEP(value)) {
        return Promise.reject("Invalid zip code input");
    }
    return Promise.resolve();
};
