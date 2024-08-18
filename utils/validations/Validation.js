class Validation {
	constructor(object) {
		this.valid = object?.valid ?? false;
		this.error = object?.error ?? false;
		this.message = object?.message ?? '';
	}

	update(validation) {
		this.valid = validation?.valid ?? this.valid;
		this.error = validation?.error ?? this.error;
		this.message = validation?.message ?? this.message;
	}

	reset() {
		this.valid = false;
		this.error = false;
		this.message = '';
	}

	setValid() {
		this.valid = true;
	}

	setInvalid() {
		this.valid = false;
	}

	throwError() {
		this.error = true;
	}

	clearError() {
		this.error = false;
	}

	setMessage(message) {
		this.message = message;
	}

	addMessage(message) {
		this.message = `${this.message} ${message}`;
	}

	clearMessage() {
		this.message = '';
	}
}

export default Validation;
