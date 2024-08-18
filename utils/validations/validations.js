
export class Validation {
    constructor(object){
        this.valid = object?.valid ?? false;
        this.error = object?.error ?? false;
        this.message = object?.message ?? "";
    }

    update (validation) {
        this.valid = validation?.valid ?? this.valid;
        this.error = validation?.error ?? this.error;
        this.message = validation?.message ?? this.message;
    }

    reset () {
        this.valid = false;
        this.error = false;
        this.message = "";
    }

    setValid () { this.valid = true }

    setInvalid () { this.valid = false }

    throwError () { this.error = true }

    clearError () { this.error = false }

    setMessage (message) { this.message = message }
    
    addMessage (message) { this.message = `${this.message} ${message}` }
    
    clearMessage () { this.message = "" }
}

export const returnValidation = (array, index, propName) => {
    let item = {}
    for (let i = 0; i < array.length; i++) {
        if ( i === index ) {
            let object = array[i];
            for (let key in object) {
                if (object.key === propName) {
                    item = array[i];
                }
            }
        };
    }
    console.log(item)
    return item
}

export const validateObject = (object) => {
    let validations = []
    for (let key in object) {
        if (object[key] === undefined || object[key] === null || object[key] === "" || typeof(object[key]) === ("string" || "number")){
            let validation = {
                error: false,
                type: key,
                message: `value of "${key}" is invalid`,
            }
            validations.push(validation)
        }
    }
    return validations;
}

export const validateArray = (array) => {
    let validations = []
    for (let i = 0; i < array.length; i++) {
        let object = array[i];
        for (let key in object) {
            if (key !== "id") {
                if (object[key] === undefined || object[key] === null || object[key] === ""){
                    let validation = {
                        error: true,
                        type: key,
                        index: i,
                        message: `value of "${key}" is invalid`,
                    }
                    validations.push(validation)
                }
            }
        }
    }
    return validations;
}

export const removeEmptyKeys = (object) => {
    let array_01 = []
    let array_02 = []
    let array_03 = []
    for (let key in object) {
        if (typeof(object[key]) !== ("array" || "object")) {
            array_02.push(key);
        }
        if(object[key] === undefined || object[key] === null || object[key] === "" || typeof(object[key]) === ("string" || "number")){
            array_03.push(key)
        }
    }
    if (array_02.length !== array_03.length) {
        array_01.push(object)
    }
    return array_01;
}

export const removeEmptyElements = (array) => {
    let array_01 = []
    for (let i = 0; i < array.length; i++) {
        let array_02 = []
        let array_03 = []
        let object = array[i];
        for (let key in object) {
            if (key !== "id") {
                if (typeof(object[key]) === "string" || typeof(object[key]) ===  "number") {
                    array_02.push(key);
                    if(object[key] === ""){
                        array_03.push(key);
                    }
                }
            }
        }
        // console.log(array_02)
        // console.log(array_03)
        if (array_03.length === -1) {
        }
        if (array_02.length !== array_03.length) {
            array_01.push(array[i]);
            // console.log(array_01)
        }
    }
    return array_01;
}

export const validateEmail = (mail) => {
    let validation = new Validation();
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        validation.update({ valid: true, error: false, message: "Email ID is valid"});
        return validation;
    }
    validation.update({ valid: false, error: true, message: "Email ID is not valid"});
    return validation;
}

export const validatePhoneNumber = (number) => {
    let validation = new Validation();
    // const twelveDigits = /^\+?([0-9]{2})\)?([0-9]{10})$/;
    const tenDigits = /^\d{10}$/
    if (number.match(tenDigits)) {
        validation.update({ valid: true, error: false, message: "Phone Number is valid"});
        return validation;
    }
    validation.update({ valid: false, error: true, message: "Phone Number is not valid"});
    return validation;
}

export const validateEmailOrPhone = (value) => {
    let value_01 = value.trim().toLowerCase();
    let abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let valueIsEmail = null;
    for (let i = 0; i < abc.length; i++) {
        if (value_01.includes(abc[i]) === true) {
            valueIsEmail = true;
            break;
        } else {
            valueIsEmail = false;
        }
    }
    if (valueIsEmail === true) {
        let result = validateEmail(value_01);
        return result;
    } else if (valueIsEmail === false) {
        let result = validatePhoneNumber(value_01);
        return result;
    }
};

export const validateDomain = (domain) => {
    let validation = new Validation();
    let result = domain.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (result == null) {
        validation.update({ valid: false, error: true, message: "Please enter a correct domain"});
        return validation;
    } else {
        validation.update({ valid: true, error: false, message: "Web Domain is valid"});
        return validation;
    }
}

