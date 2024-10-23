import Pencil from "@/components/image-gallery/pencil";
import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

const captions = [
  "Nice day",
  "Woobler playing with cars",
  "Bread times"
];
const index = 2;

describe('<Pencil />', () => {
  describe('WHEN: the user clicks it', () => {
    test('THEN: it triggers a modal', async () => {


      render(<Pencil captions={captions} index={index}/>);

      const pencilButton = screen.getByTestId("pencil-button");
      let modal = screen.queryByTestId("pencil-triggered-modal");

      expect(modal).toBeNull();

      fireEvent.click(pencilButton);

      await waitFor(() => {
        modal = screen.getByText(`Original caption: ${captions}`);
        expect(modal).toBeInTheDocument();
      });
    });
  });


  describe('WHEN: the user clicks the pencil,', () => {
    describe('AND: the modal appears and clicks the cancel button,', () => {
      test('THEN: modal closes.', async () => {

        render(<Pencil captions={captions} index={index}/>);
        const pencilButton = screen.getByTestId("pencil-button");
        let modal = document.querySelector(".woh__pencil-triggered-modal");

        expect(modal).toBeNull();

        fireEvent.click(pencilButton);

        const modalCancelBtn = document.querySelector(".woh__modal-cancel-button");
        fireEvent.click(modalCancelBtn);

        await waitFor(() => {
          modal = screen.getByText(`Original caption: ${captions[2]}`);
          expect(modal).toBeNull();
        });
      });
    });
  });
});
