import { render, screen } from '@testing-library/react';
import LoginForm from '.';
import { validateEmail, validatePassword } from './FormComponent';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Unit test 
describe('Email Validation', () => {
  test('valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('invalid email', () => {
    expect(validateEmail('invalidemail')).toBe(false);
  });
});

describe('Password Validation', () => {
  test('valid password', () => {
    expect(validatePassword('Passw0rd!')).toBe(true);
  });

  test('invalid password', () => {
    expect(validatePassword('invalidpass')).toBe(false);
  });
});
