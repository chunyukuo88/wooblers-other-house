import Pencil from "@/components/image-gallery/pencil";
import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

describe('<Pencil />', () => {
  describe('WHEN: the user clicks it', () => {
    test('THEN: it triggers a modal', async () => {
      const {debug} = render(<Pencil />);
      const pencilButton = screen.getByTestId("pencil-button");
      let modal = screen.queryByTestId("pencil-triggered-modal");

      expect(modal).toBeNull();

      fireEvent.click(pencilButton);

      await waitFor(() => {
        modal = screen.getByTestId("pencil-triggered-modal");
        expect(modal).toBeInTheDocument();
      });
    });
  });
});
