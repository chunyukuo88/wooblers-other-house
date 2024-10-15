import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../app/login/page";

// Jest was yapping about act so I did this.
jest.spyOn(console, "error").mockImplementation(() => {});

describe("index.tsx", () => {
  describe("WHEN: the page loads,", () => {
    test("THEN: The title is visible", () => {
      render(<Login />);

      const title = document.querySelector(".page-login__title");

      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Login");
    });
  });
  describe("GIVEN: the user has submitted valid username and password", () => {
    describe("WHEN: the user submits credentials", () => {
      describe("THEN: logs the result", () => {
        render(<Login />);


      });
    });
  });
});
