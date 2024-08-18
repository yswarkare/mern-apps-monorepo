const validateGst = (gst) => {

	let result = gst.match(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/);
	if (result == null) {
		return { valid: false, error: true, message: 'Please enter a valid GST number' };
	} else {
		return { valid: true, error: false, message: 'GST number is valid' };
	}
};

export default validateGst;
