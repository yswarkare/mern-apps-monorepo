import { validateEmail, validatePhoneNumber } from "./validations";

export const validateEmailOrPhone = (value = '') => {
  let value_01 = value.trim().toLowerCase();
  let valueIsEmail = value_01.includes('@') && value_01.includes('.');
  if (valueIsEmail === true) {
      return validateEmail(value_01);;
  } else if (valueIsEmail === false) {
      return validatePhoneNumber(value_01);
  }
};