import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText('Sign in');
  expect(signInText).toBeInTheDocument();
});

test('displays error message for invalid email', () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText('Email Address');

  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

  const errorText = screen.getByText('Invalid email address');
  expect(errorText).toBeInTheDocument();
});

test('displays error message for invalid password', () => {
  render(<LoginForm />);
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

  const errorText = screen.getByText(
    'Password should be at least 8 characters, containing uppercase, lowercase, a number, and a special character'
  );
  expect(errorText).toBeInTheDocument();
});

test('displays success message for valid email and password', () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText('Email Address');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

  const successMessage = screen.getByText('Login Successful');
  expect(successMessage).toBeInTheDocument();
});

test('displays error message for invalid email or password', () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText('Email Address');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

  const errorMessage = screen.getByText('Invalid email or password');
  expect(errorMessage).toBeInTheDocument();
});
