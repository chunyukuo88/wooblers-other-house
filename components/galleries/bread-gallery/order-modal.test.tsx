import OrderModal, {OrderModalProps} from "./order-modal";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {sendEmail} from "./utils";

jest.mock("./utils");

describe("GIVEN: the component is passed valid params", () => {
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

    const title = screen.getByText(`Order: ${uppercaseName}`);

    expect(title).toBeVisible();
  });
  describe("WHEN: the user clicks the cancel button,", () => {
    test("THEN: the closeModal callback is invoked.", () => {
      const props:OrderModalProps = {
        breadType: "brioche",
        session: "a long token ~",
        userEmail: "user@example.com",
        closeModal: jest.fn(),
      };

      render(<OrderModal {...props}/>);
      const cancelButton = screen.getByText("Cancel");

      fireEvent.click(cancelButton);

      expect(props.closeModal).toBeCalledTimes(1);
    });
  });
  describe("WHEN: the user presses the button to confirm the order", () => {
    test("THEN: the order is sent to the API route.", () => {
      (sendEmail as jest.Mock).mockImplementationOnce(() => {});
      const props:OrderModalProps = {
        breadType: "brioche",
        session: "a long token ~",
        userEmail: "user@example.com",
        closeModal: jest.fn()
      };
      render(<OrderModal {...props}/>);
      const confirmationButton = screen.getByText("Submit");

      fireEvent.click(confirmationButton);

      expect(sendEmail).toBeCalledTimes(1);
    });
    test("THEN: the callback to close the modal is invoked.", async () => {
      (sendEmail as jest.Mock).mockImplementationOnce(() => {});
      const props:OrderModalProps = {
        breadType: "brioche",
        session: "a long token ~",
        userEmail: "user@example.com",
        closeModal: jest.fn(),
      };
      render(<OrderModal {...props}/>);
      const confirmationButton = screen.getByText("Submit");

      fireEvent.click(confirmationButton);

      await waitFor(() => {
        expect(props.closeModal).toBeCalledTimes(1);
      })
    });
  });
});
