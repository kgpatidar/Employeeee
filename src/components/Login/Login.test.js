import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "./Login";

describe("<Login />", () => {
  test("render email input", () => {
    render(<Login />);

    const element = screen.getByTestId("email-input");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("type", "email");
  });

  test("pass valid email to test email input field", () => {
    render(<Login />);

    const element = screen.getByTestId("email-input");
    userEvent.type(element, "test@mail.com");

    expect(screen.getByTestId("email-input")).toHaveValue("test@mail.com");
  });

  test("pass invalid email to test input value", () => {
    render(<Login />);

    const element = screen.getByTestId("email-input");
    userEvent.type(element, "test");

    expect(screen.getByTestId("email-input")).toHaveValue("test");
  });
});
