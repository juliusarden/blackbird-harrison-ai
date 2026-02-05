import { validateEmail, validatePassword } from './validation';

test("Password should be 8 or more characters", () => {
    expect(validatePassword("aaa")).toBe("Password should be 8 or more characters");
});

test("Password should contains minimum 1 character for both uppercase and lowercase letter", () => {
    expect(validatePassword("aaabbbcc")).toBe("Password should contains minimum 1 character for both uppercase and lowercase letter");
    expect(validatePassword("AAABBBCC")).toBe("Password should contains minimum 1 character for both uppercase and lowercase letter");
});

test("Password should contains minimum 1 digit of numeric value", () => {
    expect(validatePassword("Aaabbbcc")).toBe("Password should contains minimum 1 digit of numeric value");
});

test("Password should contains minimum 1 special character", () => {
    expect(validatePassword("Aaabbbcc1")).toBe("Password should contains minimum 1 special character");
});

test("Password that meet all requirements should pass validation and return no error message", () => {
    expect(validatePassword("Aaabbbcc1#")).toBe("");
});


test("Email should contain @ symbol", () => {
    expect(validateEmail("aaa")).toBe(false);
});

test("Email should contain correct domain", () => {
    expect(validateEmail("aaa@gmail.c")).toBe(false);
});

test("Valid email should pass validation", () => {
    expect(validateEmail("aaa@gmail.com")).toBe(true);
});
