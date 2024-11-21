import Pencil from "@/components/galleries/main-gallery/pencil";
import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import {SessionProvider} from "next-auth/react";

const captions = [
  "Nice day",
  "Woobler playing with cars",
  "Bread times"
];
const index = 2;

describe.skip('<Pencil />', () => {
  describe('WHEN: the user clicks it', () => {
    test('THEN: it triggers a modal', async () => {

      const pageProps = {
        session: null,
      };

      render(
        <SessionProvider session={pageProps.session}>
          <Pencil captions={captions} index={index}/>
        </SessionProvider>
      );

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
        const pageProps = {
          session: null,
        };

        render(
          <SessionProvider session={pageProps.session}>
            <Pencil captions={captions} index={index}/>
          </SessionProvider>
        );

        const pencilButton = screen.getByTestId("pencil-button");
        let modal = document.querySelector(".woh__pencil-triggered-modal");

        expect(modal).toBeNull();

        fireEvent.click(pencilButton);

        const modalCancelBtn = document.querySelector(".woh__modal-cancel-button")!;
        fireEvent.click(modalCancelBtn);

        await waitFor(() => {
          modal = screen.getByText(`Original caption: ${captions[2]}`);
          expect(modal).toBeNull();
        });
      });
    });
  });
});
