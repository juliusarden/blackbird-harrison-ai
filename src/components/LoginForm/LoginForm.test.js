import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from ".";

const fillOutFormAndSubmit = (email, password) => {
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: password },
  });
  fireEvent.click(screen.getByRole("button", { type: /submit/i }));
};

test("renders sign in page", () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

test("renders sign in successful", async () => {
  render(<LoginForm />);

  fillOutFormAndSubmit("abc@mail.com", "abcABC@123");

  const alert = await screen.findByText("Login Successful");

  expect(alert).toHaveTextContent("Login Successful");
});

test("not have valid email", async () => {
  render(<LoginForm />);

  fillOutFormAndSubmit("abcmail.com", "abcABC@123");

  const alert = await screen.findByText("Please enter valid email address.");

  expect(alert).toHaveTextContent("Please enter valid email address.");
});

test("password length is less than 8", async () => {
  render(<LoginForm />);

  fillOutFormAndSubmit("abc@mail.com", "abc");

  const alert = await screen.findByText(
    "Password should be 8 or more characters."
  );

  expect(alert).toHaveTextContent("Password should be 8 or more characters.");
});

test("not have both lower and uppercase letter in password", async () => {
  render(<LoginForm />);

  fillOutFormAndSubmit("abc@mail.com", "qwertykey");

  const alert = await screen.findByText(
    "Password should contains both uppercase and lowercase letter."
  );

  expect(alert).toHaveTextContent(
    "Password should contains both uppercase and lowercase letter."
  );
});

test("not have number in password", async () => {
  render(<LoginForm />);

  fillOutFormAndSubmit("abc@mail.com", "qwertyKey");

  const alert = await screen.findByText(
    "Password should contains minimum 1 digit of numeric value."
  );

  expect(alert).toHaveTextContent(
    "Password should contains minimum 1 digit of numeric value."
  );
});

test("not have special character in password", async () => {
  render(<LoginForm />);

  fillOutFormAndSubmit("abc@mail.com", "abcABC123");

  const alert = await screen.findByText(
    "Password should contains minimum 1 special character."
  );

  expect(alert).toHaveTextContent(
    "Password should contains minimum 1 special character."
  );
});
