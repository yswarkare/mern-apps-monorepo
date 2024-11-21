import { CreateUserDto } from '../db/user.dto';

export const validateEmail = (mail: string) => {
	console.log({ mail });
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
		return { valid: true, error: false, message: 'Email ID is valid' };
	}
	return { valid: false, error: true, message: 'Email ID is not valid' };
};

export const passwordAllocations = (user: CreateUserDto) => {
	let password = user.password.trim();
	let username = user.username.trim();
	let emailId = user.email.trim();
	if (password === username) {
		return { success: false, message: "Don't user your Username as password.", errorType: 'password' };
	}
	if (password === emailId) {
		return { success: false, message: "Don't user your Email ID as password.", errorType: 'password' };
	}
	return { success: true, message: 'Password is allowed.', errorType: 'password' };
};

export const validatePassword = (inputPassword: string) => {
	let errors = [];
	let password = inputPassword.trim();
	if (password.length < 8) {
		errors.push(' at least 8 characters');
	}
	if (password.search(/[A-Z]/g) < 0) {
		errors.push(' at least one uppercase letter');
	}
	if (password.search(/[a-z]/g) < 0) {
		errors.push(' at least one lowercase letter');
	}
	if (password.search(/[0-9]/g) < 0) {
		errors.push(' at least one digit');
	}
	if (password.search(/[^a-zA-Z\d]/g) < 0) {
		errors.push(' at least one special character');
	}
	if (errors.length > 0) {
		console.table({ success: false, message: 'Your password must contain ', errors: `${errors}` });
		return { success: false, message: "Your password doesn't contain", errors: `${errors}`, errorType: 'password' };
	}
	console.table({ success: true, message: 'password is valid.' });
	return { success: true, message: 'password is valid.', errorType: 'password', errors };
};
