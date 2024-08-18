export const validateEmail = (mail: string) => {
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
		return { valid: true, error: false, message: 'Email ID is valid' };
	}
	return { valid: false, error: true, message: 'Email ID is not valid' };
};
