export default class Validador {

    constructor(validator) {
        this.validator = validator;
    }

    verify(obj) {
        throw new Error(`Don't implemented yet`);
    }

    validate(obj) {
        this.verify(obj);
        this.validator && this.validator.validate(obj); 
    }
}