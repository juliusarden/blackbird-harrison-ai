import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

test('shows an error for an invalid email', async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalid-email' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Valid1!' } });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });
});

test('shows an error for an invalid password', async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'user@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345' } }); // Invalid password
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });
});

test('shows success message on valid input', async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'valid@email.com' }});
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'ValidPassword123!' }});
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/login successful/i)).toBeInTheDocument();
  });
});
