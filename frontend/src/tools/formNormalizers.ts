export const normalizeDocumentNumber = (value: string) => {
	value = value.replace(/\D/g, "");
	value = value.slice(0, 11);
	value = value.replace(/(\d{3})(\d)/, "$1.$2");
	value = value.replace(/(\d{3})(\d)/, "$1.$2");
	value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
	return value;
};

export const normalizeZipCode = (value: string) => {
	value = value.replace(/\D/g, "");
	value = value.slice(0, 8);
	value = value.replace(/^(\d{5})(\d)/, "$1-$2");
	return value;
};

export const normalizePhoneNumber = (value: string) => {
	if (!value) return "";
	value = value.replace(/\D/g, "");
	value = value.replace(/(\d{2})(\d)/, "($1) $2");
	value = value.replace(/(\d)(\d{4})$/, "$1-$2");
	return value;
};
