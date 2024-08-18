export const validateDomain = (domain: string) => {
	let result = domain.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	if (result == null) {
		return { valid: false, error: true, message: 'Please enter a correct domain' };
	} else {
		return { valid: true, error: false, message: 'Web Domain is valid' };
	}
};
