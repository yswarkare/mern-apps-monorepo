import { CreateUserDto, UserDto } from '../db/user.dto';
import { validateEmail, validatePassword, passwordAllocations } from './validators';

export const validateUserDto = (user: UserDto | CreateUserDto) => {
	let isValid = true;
	const errors: string[] = [];
	const props: Array<string> = ['email', 'username'];

	for (const key in user) {
		if (props.includes(key)) {
			user[key] = user[key].trim();
			if (!user[key]) {
				isValid ? (isValid = false) : null;
				errors.push(`${key} is empty`);
			}
		}
	}

	if (!isValid) return { isValid, errors };

	if (isValid && user.email) {
		const { valid, message } = validateEmail(user.email);
		if (!valid) {
			isValid = valid;
			errors.push(message);
		}
	}

	return { isValid, errors };
};

export const validateCreateUserDto = (user: CreateUserDto) => {
	let isValid = true;
	const errors: string[] = [];
	for (const key in user) {
		user[key] = user[key].trim();
		if (!user[key]) {
			isValid ? (isValid = false) : null;
			errors.push(`${key} is empty`);
		}
	}

	if (!isValid) return { isValid, errors };

	if (isValid) {
		const { valid, message } = validateEmail(user.email);
		if (!valid) {
			isValid = valid;
			errors.push(message);
		}
	}

	if (isValid) {
		const { success, message } = passwordAllocations(user);
		if (!success) {
			isValid = success;
			errors.push(message);
		}
	}

	if (user.password && isValid) {
		const { success, message, errors: err } = validatePassword(user.password);
		if (!success) {
			isValid = success;
			errors.splice(errors.length, 0, message, ...err);
		}
	}

	return { isValid, errors };
};
