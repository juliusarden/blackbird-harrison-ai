import * as EmailValidator from 'email-validator';

const hasSpecialChar = (str) => {
    return /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(str);
}

const hasNumber = (str) => {
    return /\d/.test(str);
}

const hasLowerCase = (str) => {
    return str.toUpperCase() !== str;
}

const hasUpperCase = (str) => {
    return str.toLowerCase() !== str;
}

function validatePassword(text) {
    if (text.length < 8) return "Password should be 8 or more characters";
    if (!hasLowerCase(text) || !hasUpperCase(text)) return "Password should contains minimum 1 character for both uppercase and lowercase letter";
    if (!hasNumber(text)) return "Password should contains minimum 1 digit of numeric value";
    if (!hasSpecialChar(text)) return "Password should contains minimum 1 special character";
    return "";
}

function validateEmail(email) {
    return EmailValidator.validate(email);
}

export {
    validatePassword,
    validateEmail,
}