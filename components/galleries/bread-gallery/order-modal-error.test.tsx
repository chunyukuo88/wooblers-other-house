import OrderModal, {OrderModalProps} from "./order-modal";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {sendEmail} from "./utils";
import {errorLogger} from "../../../common/logging";

jest.mock("./utils");
jest.mock("../../../common/logging");

const props:OrderModalProps = {
  breadType: "brioche",
  session: "a long token ~",
  userEmail: "user@example.com",
  closeModal: jest.fn(),
};
describe("AND: there is a problem with the email API", () => {
  test("THEN: it logs an error to the console", async () => {
    (sendEmail as jest.Mock).mockRejectedValueOnce("Problem with the API");
    (errorLogger as jest.Mock).mockImplementationOnce(jest.fn());

    render(<OrderModal {...props}/>);
    const confirmationButton = screen.getByText("Submit");
    fireEvent.click(confirmationButton);

    await waitFor(() => {
      expect(errorLogger).toHaveBeenCalledTimes(1);
      expect(errorLogger).toHaveBeenCalledWith("Email failed: Problem with the API");
    });
    jest.clearAllMocks();
  });
});