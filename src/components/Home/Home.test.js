import { render, screen } from "@testing-library/react";

import Home from "./Home";

describe("<Home />", () => {
  test("render component check", () => {
    render(<Home />);

    const element = screen.getByTestId("home-test-id");
    expect(element).toBeInTheDocument();
    expect(element).toContainElement(<header />);
    expect(element).toBeTruthy();
  });

  test("render searchbar check", () => {
    render(<Home />);

    const element = screen.getByTestId("searchbar-test-id");
    expect(element).toBeTruthy();
    expect(element).toContainEqual("search");
    expect(element).toHaveAttribute("type", "search");
  });
});
