import validator from 'email-validator';

// ---- Helper functions (same logic as in index.js) ----
const validateEmail = (email) => validator.validate(email);

const validatePassword = (password) => {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#$%^&*]/.test(password)) return false;
  return true;
};

// ---- Email Tests ----
describe('validateEmail', () => {
  test('valid email returns true', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });
  test('missing @ returns false', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });
  test('missing domain returns false', () => {
    expect(validateEmail('user@')).toBe(false);
  });
  test('empty string returns false', () => {
    expect(validateEmail('')).toBe(false);
  });
});

// ---- Password Tests ----
describe('validatePassword', () => {
  test('valid password returns true', () => {
    expect(validatePassword('Abcdef1!')).toBe(true);
  });
  test('less than 8 characters returns false', () => {
    expect(validatePassword('Ab1!')).toBe(false);
  });
  test('no uppercase returns false', () => {
    expect(validatePassword('abcdef1!')).toBe(false);
  });
  test('no lowercase returns false', () => {
    expect(validatePassword('ABCDEF1!')).toBe(false);
  });
  test('no number returns false', () => {
    expect(validatePassword('Abcdefg!')).toBe(false);
  });
  test('no special character returns false', () => {
    expect(validatePassword('Abcdef12')).toBe(false);
  });
  test('empty string returns false', () => {
    expect(validatePassword('')).toBe(false);
  });
});