import Pencil from "@/components/image-gallery/pencil";
import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

const caption = "Woobler playing with cars";
const index = 3;

describe('<Pencil />', () => {
  describe('WHEN: the user clicks it', () => {
    test('THEN: it triggers a modal', async () => {
      render(<Pencil caption={caption} index={index}/>);
      const pencilButton = screen.getByTestId("pencil-button");
      let modal = screen.queryByTestId("pencil-triggered-modal");

      expect(modal).toBeNull();

      fireEvent.click(pencilButton);

      await waitFor(() => {
        modal = screen.getByText(`Original caption: ${caption}`);
        expect(modal).toBeInTheDocument();
      });
    });
  });
});
