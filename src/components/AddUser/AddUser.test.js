import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddUser from "./AddUser";

describe("<AddUser />", () => {
  test("render component check", () => {
    render(<AddUser />);

    const element = screen.getByTestId("AddUser-test-id");
    expect(element).toBeTruthy();
    expect(element).toHaveAttribute(<input />);
  });

  test("render button check", () => {
    render(<Login />);

    const element = screen.getByTestId("adduser-btn-id");
    expect(element).toBeTruthy();
    expect(element).toContainHTML("Submit");
    element.click();
  });
});
