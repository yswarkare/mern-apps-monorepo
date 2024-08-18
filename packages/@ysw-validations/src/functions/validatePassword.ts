const validatePassword = (inputPassword: string) => {
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
		let message = errors.join(', ');
		return { valid: false, error: true, message: `Your password must contain ${message}` };
	} else {
		return { valid: true, error: false, message: 'password is valid.' };
	}
};

export { validatePassword };
