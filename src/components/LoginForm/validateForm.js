import * as EmailValidator from 'email-validator';

function validateEmail(email){
    return EmailValidator.validate(email)
}

function hasLowerCase(text) {
    return /[a-z]/.test(text);
}

function hasUpperCase(text) {
    return /[A-Z]/.test(text);
}

function hasNumber(text) {
    return /[0-9]/.test(text);
}

function hasSpecialChar(text) {
    return /[^a-zA-Z0-9]/.test(text);
}

function validatePassword(text) {
    if (!text || text.length < 8) return "Password should be 8 or more characters";
    if (!hasLowerCase(text) || !hasUpperCase(text)) return "Password should contains minimum 1 character for both uppercase and lowercase letter";
    if (!hasNumber(text)) return "Password should contains minimum 1 digit of numeric value";
    if (!hasSpecialChar(text)) return "Password should contains minimum 1 special character";
    return "";
}

export {
    validateEmail,
    validatePassword
}
