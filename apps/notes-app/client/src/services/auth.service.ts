const baseUrl = 'http://localhost:5000/api';

class AuthService {
	#myHeaders = new Headers();

	constructor() {
		this.#myHeaders.append('Content-Type', 'application/json');
	}

	static authenticateToken() {
		return fetch(`${baseUrl}/auth/authenticate-token`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({}),
		});
	}

	static verifyToken() {
		return fetch(`${baseUrl}/auth/verify-token`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({}),
		});
	}

	static signUpAndLogIn(url: string) {
		return function (data: object) {
			return fetch(url, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
		};
	}

	static signUp() {
		return this.signUpAndLogIn(`${baseUrl}/user/sign-up`);
	}

	static logIn() {
		return this.signUpAndLogIn(`${baseUrl}/user/log-in`);
	}
}

export default AuthService;
