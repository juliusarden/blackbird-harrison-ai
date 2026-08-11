import { validatePassword } from './validatePassword';

describe('validatePassword', () => {
  test('passes for a password that meets every rule', () => {
    const result = validatePassword('Abcdef1!');
    expect(result.isValid).toBe(true);
    expect(result.message).toBe('');
  });

  test('fails when shorter than 8 characters', () => {
    const result = validatePassword('Ab1!');
    expect(result.isValid).toBe(false);
    expect(result.message).toMatch(/at least 8 characters/);
  });

  test('fails when missing an uppercase letter', () => {
    const result = validatePassword('abcdefg1!');
    expect(result.isValid).toBe(false);
    expect(result.message).toMatch(/an uppercase letter/);
  });

  test('fails when missing a lowercase letter', () => {
    const result = validatePassword('ABCDEFG1!');
    expect(result.isValid).toBe(false);
    expect(result.message).toMatch(/a lowercase letter/);
  });

  test('fails when missing a numerical digit', () => {
    const result = validatePassword('Abcdefgh!');
    expect(result.isValid).toBe(false);
    expect(result.message).toMatch(/a number/);
  });

  test('fails when missing a special character', () => {
    const result = validatePassword('Abcdefg1');
    expect(result.isValid).toBe(false);
    expect(result.message).toMatch(/a special character/);
  });

  test('fails on an empty password and reports every missing rule', () => {
    const result = validatePassword('');
    expect(result.isValid).toBe(false);
    expect(result.message).toMatch(/at least 8 characters/);
    expect(result.message).toMatch(/a lowercase letter/);
    expect(result.message).toMatch(/an uppercase letter/);
    expect(result.message).toMatch(/a number/);
    expect(result.message).toMatch(/a special character/);
  });

  test('accepts a variety of special characters', () => {
    expect(validatePassword('Password1@').isValid).toBe(true);
    expect(validatePassword('Password1#').isValid).toBe(true);
    expect(validatePassword('Password1$').isValid).toBe(true);
    expect(validatePassword('Password1%').isValid).toBe(true);
    expect(validatePassword('Password1^').isValid).toBe(true);
    expect(validatePassword('Password1&').isValid).toBe(true);
    expect(validatePassword('Password1*').isValid).toBe(true);
  });
});
