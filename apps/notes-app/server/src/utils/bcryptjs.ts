import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		password = hash.toString();
		console.log(password);
		return { success: true, message: 'Password bcrypt successful.', hashed: password };
	} catch (err) {
		return { success: false, message: 'Failed to bcrypt password', error: `${err}` };
	}
};

export const comparePassword = async (inputPassword: string, hashedPassword: string) => {
	try {
		let isMatch = await bcrypt.compare(inputPassword, hashedPassword);
		if (isMatch === false) {
			return { success: false, message: 'Password is incorrect.', errorType: 'password' };
		}
		return { success: true, message: 'Password is correct.' };
	} catch (err) {
		return { success: false, message: 'Failed to compare password.', error: { err }, errorType: 'password' };
	}
};
