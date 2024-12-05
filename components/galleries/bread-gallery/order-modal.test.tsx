import OrderModal from "./order-modal";
import {fireEvent, render, screen} from "@testing-library/react";
import {sendEmail} from "./utils";

jest.mock("./utils");

describe("GIVEN: the component is passed bread type as a string", () => {
  describe("WHEN: the user presses the button to confirm the order", () => {
    test("THEN: the order is sent to the API route.", () => {
      (sendEmail as jest.Mock).mockImplementationOnce(() => {});

      render(
        <OrderModal
          breadType={"Brioche"}
        />
      );

      const confirmationButton = screen.getByText("Submit");

      fireEvent.click(confirmationButton);

      expect(sendEmail).toBeCalledTimes(1);
    });
  });
});
