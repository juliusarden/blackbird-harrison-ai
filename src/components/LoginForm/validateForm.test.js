import { validateEmail, validatePassword } from './validateForm';

describe('validateEmail', () => {
  test.each([
    'user@example.com',
    'first.last@example.com',
    'user+tag@example.co.uk',
    'user@sub.domain.example.com',
    'user-name@example.io',
  ])('returns true for valid email "%s"', (email) => {
    expect(validateEmail(email)).toBe(true);
  });

  test.each([
    '',
    'plainaddress',
    'user@',
    '@example.com',
    'user@example',
    'user name@example.com',
    'user@example..com',
  ])('returns false for invalid email "%s"', (email) => {
    expect(validateEmail(email)).toBe(false);
  });
});

describe('validatePassword', () => {
  test.each([
    'Abcdefg1!',
    'Str0ng@Password',
    'xY9#mnopqrst',
  ])('returns no error for valid password "%s"', (password) => {
    expect(validatePassword(password)).toBe('');
  });

  it('accepts a password of exactly 8 characters', () => {
    expect(validatePassword('Abcd123!')).toBe('');
  });

  test.each([
    '',
    'Ab1!',
    'Abcde1!',
  ])('rejects password "%s" shorter than 8 characters', (password) => {
    expect(validatePassword(password)).toBe('Password should be 8 or more characters');
  });

  it('rejects a password without a lowercase letter', () => {
    expect(validatePassword('ABCDEFG1!')).toBe('Password should contains minimum 1 character for both uppercase and lowercase letter');
  });

  it('rejects a password without an uppercase letter', () => {
    expect(validatePassword('abcdefg1!')).toBe('Password should contains minimum 1 character for both uppercase and lowercase letter');
  });

  it('rejects a password without a digit', () => {
    expect(validatePassword('Abcdefgh!')).toBe('Password should contains minimum 1 digit of numeric value');
  });

  it('rejects a password without a special character', () => {
    expect(validatePassword('Abcdef12')).toBe('Password should contains minimum 1 special character');
  });

  test.each(['!', '@', '#', '$', '%', '^', '&', '*', '?', '.', ','])(
    'accepts special character "%s"',
    (char) => {
      expect(validatePassword(`Abcdef1${char}`)).toBe('');
    }
  );
});
