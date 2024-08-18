type Validation = {
	valid?: boolean;
	error?: boolean;
	message?: string;
};

type PropObject = {
	name?: string;
	label?: string;
	value?: string;
	type?: string;
	required?: boolean;
	min?: number;
	max?: number;
	trim?: boolean;
	valid?: boolean | null;
	error?: boolean;
	message?: string;
	valFunc?: Function;
	regExp?: RegExp
}

enum PropKeys {
  name = 'name', label = 'label', value = 'value', type = 'type', required = 'required', min = 'min', max = 'max', trim = 'trim', valid = 'valid', error = 'error', message = 'message', valFunc = 'valFunc', regExp = 'regExp'
} 

export class Prop implements PropObject {
	name: string | undefined;
	label: string | undefined;
	value: string | undefined;
	type: string | undefined;
	required: boolean | undefined;
	min: number | undefined;
	max: number | undefined;
	trim: boolean | undefined; 
	valid: boolean | null | undefined;
	error: boolean | undefined;
	message: string | undefined;
	valFunc: Function | undefined;
	regExp: RegExp | undefined

	constructor(object: PropObject) {
		this.name = object?.name || object?.label;
		this.label = object?.label || object?.name;
		this.value = object?.value;
		this.type = object?.type;
		this.required = object?.required;
		this.min = object?.min;
		this.max = object?.max;
		this.trim = object.trim;
		this.valid = object?.valid;
		this.error = object?.error;
		this.message = object?.message;
		this.valFunc = object?.valFunc;
		this.regExp =  object?.regExp
	}

	updateKeyValue(object: { key: PropKeys; value: any }) {
		for (let key in object) {
			if (object.key === key) {
				if (this[object.key]) {
					this[object.key] = object.value;
				}
			}
		}
	}

	updateValidation(validation: Validation) {
		this.valid = validation?.valid ?? this.valid;
		this.error = validation?.error ?? this.error;
		this.message = validation?.message ?? this.message;
	}

	resetValidation() {
		this.valid = null;
		this.error = false;
		this.message = '';
	}

	setValidProp() {
		this.valid = true;
		this.error = false;
		this.message = '';
	}

	setInvalidProp(message: string | undefined) {
		this.valid = false;
		this.error = true;
		this.message = message;
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
