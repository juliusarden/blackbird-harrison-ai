import { render, screen } from '@testing-library/react';
import LoginForm from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here
describe("validate", () => {
  it("should return false if email is invalid", () => {
    expect(validate("invalid_email", "Password1!")).toBe(false);
  });

  it("should return false if password is less than 8 characters long",)})
