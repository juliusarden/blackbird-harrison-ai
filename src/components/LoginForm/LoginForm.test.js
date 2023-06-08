import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('displays error message for invalid email', () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const emailInput = getByLabelText('Email');
    const submitButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(submitButton);

    expect(getByText('Invalid email address')).toBeInTheDocument();
  });

  it('displays error message for invalid password', () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Login');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    expect(getByText('Invalid password')).toBeInTheDocument();
  });

  it('displays success message for valid email and password', () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.click(submitButton);

    expect(getByText('Login successful')).toBeInTheDocument();
  });
});
