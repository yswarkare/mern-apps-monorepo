function string() {
	function required() {}
	function min() {}
	function max() {}
}

function constructObjectSchema () {
   console.log(string) 
}

constructObjectSchema()

// const password = Yup.string()
// 	.required('This field is required')
// 	.min(6, 'Must be at least 6 characters')
// 	.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character')
// 	.matches(/\d/, 'Must contain at least one number');
