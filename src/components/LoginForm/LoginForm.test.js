import { render, screen } from '@testing-library/react';
import LoginForm from '.';
import EmailValidator from 'email-validator';


test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here


test('validateForm', () => {
  const data = {
    email: 'test@example.com',
    password: 'Test123!'
  };
  const event = {
    preventDefault: jest.fn(),
    currentTarget: data
  };

  validateForm(event);
  expect(event.preventDefault).toHaveBeenCalled();
  expect(showAlert).toBe(false);

  data.email = 'invalid';
  validateForm(event);
  expect(showAlert).toBe(true);

  data.email = 'test@example.com';
  data.password = 'invalid';
  validateForm(event);
  expect(showAlert).toBe(true);
});






