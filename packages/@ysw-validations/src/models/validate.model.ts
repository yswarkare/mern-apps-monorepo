type ValidationType = {
	valid: boolean | null;
	error: boolean | null;
	message: string | null;
};

class Validation implements ValidationType {
  valid: boolean | null;
  error: boolean | null;
  message: string | null;

	constructor(object: ValidationType) {
		this.valid = object?.valid || false;
		this.error = object?.error || false;
		this.message = object?.message || '';
	}


	update(validation: ValidationType) {
		this.valid = validation?.valid || this.valid;
		this.error = validation?.error || this.error;
		this.message = validation?.message || this.message;
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

	setMessage(message: string) {
		this.message = message;
	}

	addMessage(message: string) {
		this.message = `${this.message} ${message}`;
	}

	clearMessage() {
		this.message = '';
	}
}

export default Validation;
