import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductPage from "./ProductPage";

describe("ProductPage", () => {
  test("WHEN a user goes to the Products page, THEN the pagination control will be displayed", async () => {
    render(<ProductPage />);
    await waitForElementToBeRemoved(() => screen.queryByTitle(/loading/i));

    const previousPageButton = screen.getByRole("button", {
      name: "Previous page",
    });
    expect(previousPageButton).toBeInTheDocument();
    expect(previousPageButton).toBeDisabled();

    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    expect(nextPageButton).toBeInTheDocument();
    expect(nextPageButton).not.toBeDisabled();
  });

  test("WHEN a user goes to the Products page, THEN the current page will be highlighted in the pagination control", async () => {
    render(<ProductPage />);
    await waitForElementToBeRemoved(() => screen.queryByTitle(/loading/i));

    const pageDisplay = screen.queryByText(/page/i);
    expect(pageDisplay.textContent).toBe("Page 1 of 2");

    const nextPageButton = screen.getByRole("button", { name: "Next page" });
    userEvent.click(nextPageButton);

    expect(pageDisplay.textContent).toBe("Page 2 of 2");
  });
});
