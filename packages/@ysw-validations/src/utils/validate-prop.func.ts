import { Prop } from '../models/prop.model';

export function validateProp(prop: Prop, value: any): Prop {
	let propValue = prop.value || value;
	//* trim if true
	if (prop.trim === true && typeof propValue === 'string') {
		propValue = propValue.trim();
	}
	//* check if mandatory
	if (prop.required === true) {
		if (propValue === null || propValue === undefined || propValue === '') {
			prop.setInvalidProp(`${prop.label} is empty`);
			return prop;
		} else {
			prop.resetValidation();
		}
	}
	//* check min limit
	if (prop.min) {
		if (propValue.length < prop.min) {
			prop.setInvalidProp(`${prop.label} must be longer than ${prop.min} characters.`);
		} else {
			prop.resetValidation();
		}
	}
	//* check max limit
	if (prop.max) {
		if (propValue.length > prop.max) {
			prop.setInvalidProp(`${prop.label} must not be longer than ${prop.min} characters.`);
		} else {
			prop.resetValidation();
		}
	}
	//* check data type
	if (prop.type) {
		if (typeof propValue !== prop.type) {
			prop.setInvalidProp(`${prop.label} is not a ${prop.type}`);
			return prop;
		} else {
			prop.resetValidation();
		}
	}
	//* check with validation function
	if (prop.valFunc) {
		let validation = prop.valFunc(propValue);
		if (prop.required === true) {
			prop.updateValidation(validation);
			return prop;
		} else if (prop.required === false) {
			if (propValue === null || propValue === undefined || propValue === '') {
				prop.setValidProp();
				return prop;
			} else if (propValue) {
				prop.updateValidation(validation);
				return prop;
			}
		}
	} else {
		prop.setValidProp();
	}
	//* check with regular expression
	if (prop.regExp && prop.regExp instanceof RegExp) {
		if (prop.regExp.test(propValue)) {
			prop.setInvalidProp(`${prop.label} is invalid`);
			return prop;
		} else {
			prop.resetValidation();
		}
	}
	return prop;
}
