import OrderModal, {OrderModalProps} from "./order-modal";
import {fireEvent, render, screen} from "@testing-library/react";
import {sendEmail} from "./utils";

jest.mock("./utils");

describe("GIVEN: the component is passed bread type as a string", () => {
  test("THEN: it displays a title which is the capitalized name of the bread", () => {
    const breadType = "brioche";
    const uppercaseName = breadType.charAt(0).toUpperCase() + breadType.slice(1);
    const props:OrderModalProps = {
      breadType: breadType,
      session: "a long token ~",
      userEmail: "user@example.com",
      closeModal: jest.fn()
    };
    render(<OrderModal {...props}/>);

    const title = screen.getByText(uppercaseName);

    expect(title).toBeVisible();
  });
  describe("WHEN: the user presses the button to confirm the order", () => {
    test("THEN: the order is sent to the API route.", () => {
      (sendEmail as jest.Mock).mockImplementationOnce(() => {});
      const props:OrderModalProps = {
        breadType: "brioche",
        session: "a long token ~",
        closeModal: jest.fn()
      };
      render(<OrderModal {...props}/>);
      const confirmationButton = screen.getByText("Submit");

      fireEvent.click(confirmationButton);

      expect(sendEmail).toBeCalledTimes(1);
    });
  });
});
