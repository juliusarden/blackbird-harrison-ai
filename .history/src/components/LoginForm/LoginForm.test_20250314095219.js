import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '.';
import validator from 'email-validator';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here
test('displays error for invalid email', () => {
  render(<LoginForm />);

  // Get input fields and submit button
  const emailInput = screen.getByLabelText('Email Address');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  // Enter invalid email and valid password
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });
  fireEvent.click(submitButton);

  // Check for email error message
  const emailError = screen.getByText('Invalid email format');
  expect(emailError).toBeInTheDocument();
});

test('displays error for invalid password', () => {
  render(<LoginForm />);

  // Get input fields and submit button
  const emailInput = screen.getByLabelText('Email Address');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  // Enter valid email and invalid password
  fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'invalid' } });
  fireEvent.click(submitButton);

  // Check for password error message
  const passwordError = screen.getByText(
    /Password must be at least 8 characters long/
  );
  expect(passwordError).toBeInTheDocument();
});

test('displays success message for valid email and password', () => {
  render(<LoginForm />);

  // Get input fields and submit button
  const emailInput = screen.getByLabelText('Email Address');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  // Enter valid email and password
  fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });
  fireEvent.click(submitButton);

  // Check for success message
  const successMessage = screen.getByText('Login Successful');
  expect(successMessage).toBeInTheDocument();
});