import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { trackEvent } from '../../../../../app/analytics';
import { GA_EVENTS } from '../../../../../app/analytics/tracked-events';
import { setUpNavigatorClipboardWriteText } from '@/components/navigation/components/album-selector/__tests__/fixtures';
import { AlbumSelector } from '../album-selector';

jest.mock('../../../../../app/analytics');

describe('AlbumSelector component', () => {
  describe('AlbumSelector component', () => {
    it('WHEN: user clicks the button to share an album', async () => {
      setUpNavigatorClipboardWriteText();
      (trackEvent as jest.Mock).mockImplementationOnce(jest.fn());
      const style = {};

      render(<AlbumSelector style={style} />);

      const button = screen.getByRole('button', { name: /share/i });

      fireEvent.click(button);

      await waitFor(() => {
        expect(trackEvent).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledWith(GA_EVENTS.SHARING.SHARE_INITIATED);
      });
    });
  });
});
