const validatePhoneNumber = (number) => {
  // const twelveDigits = /^\+?([0-9]{2})\)?([0-9]{10})$/;
  const tenDigits = /^\d{10}$/
  if (number.match(tenDigits)) {
    return { valid: true, error: false, message: "Phone Number is valid"};
  }
  return { valid: false, error: true, message: "Phone Number is not valid"};
  
}

export default validatePhoneNumber;