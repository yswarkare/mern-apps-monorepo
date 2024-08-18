class Prop {
    constructor(object){
        this.name = object?.name ?? "";
        this.label = object?.label ?? object?.name ?? "";
        this.value = object?.value ?? "";
        this.type = object?.type ?? "string";
        this.required = object?.required ?? false;
        this.min = object?.min ?? "";
        this.max = object?.max ?? "";
        this.valid = object?.valid ?? false;
        this.error = object?.error ?? false;
        this.message = object?.message ?? "";
        this.valFunc = object?.valFunc ?? "";
    }

    updateKeyValue (object) {
        for (let key in object) {
            if (object.key === key) {
                this[object.key] = object.value;
            }
        }
    }

    trim () {
        this.value = this.value.trim();
    }

    updateValidation (validation) {
        this.valid = validation?.valid ?? this.valid;
        this.error = validation?.error ?? this.error;
        this.message = validation?.message ?? this.message;
    }

    resetValidation () {
        this.valid = false;
        this.error = false;
        this.message = "";
    }

    setValidProp () {
        this.valid = true;
        this.error = false;
        this.message = ""
    }
    
    setInvalidProp (message) {
        this.valid = false;
        this.error = true;
        this.message = message
    }

    setValid () { this.valid = true }

    setInvalid () { this.valid = false }

    throwError () { this.error = true }

    clearError () { this.error = false }

    setMessage (message) { this.message = message }
    
    addMessage (message) { this.message = `${this.message} ${message}` }
    
    clearMessage () { this.message = "" }
    
    validate () {
        if (this.required === true) {
            if (this.value === null || this.value === undefined || this.value === "") {
                this.setInvalidProp(`${this.label} is empty`);
                return false;
            } else {
                this.resetValidation();
            }
        }
        if (typeof(this.value) !== this.type) {
            this.setInvalidProp(`${this.label} is not a ${this.type}`);
            return false;
        } else {
            this.resetValidation();
        }
        if (this.valFunc) {
            let validation = this.valFunc(this.value);
            if (this.required === true) {
                this.updateValidation(validation);
                return validation.valid;
            } else if (this.required === false) {
                if (this.value === null || this.value === undefined || this.value === "") {
                    this.setValidProp();
                    return true;
                } else if (this.value) {
                    this.updateValidation(validation);
                    return validation.valid;
                }
            }
        } else {
            this.setValidProp()
            return true
        }
    }
}

export default Prop;