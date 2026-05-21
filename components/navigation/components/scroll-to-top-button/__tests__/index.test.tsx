import ScrollToTopButton from '..';
import { trackEvent } from '../../../../../app/analytics';
import { getIntersectionObserver } from '../utils';
import { fireEvent, render, screen } from '@testing-library/react';
import { GA_EVENTS } from '../../../../../app/analytics/tracked-events';

jest.mock('../utils');
jest.mock('../../../../../app/analytics');

afterEach(() => {
  jest.clearAllMocks();
});

describe('ScrollToTopButton', () => {
  describe('WHEN: the Woobler button is clicked', () => {
    it('THEN: scrolls to the top of the page', () => {
      (trackEvent as jest.Mock).mockImplementationOnce(jest.fn());
      (getIntersectionObserver as jest.Mock).mockReturnValueOnce({
        observe: jest.fn(),
      });
      const spy = jest.spyOn(window, 'scrollTo').mockImplementation(jest.fn());

      render(<ScrollToTopButton />);
      const woobler = screen.getByTestId('woobler-button');

      fireEvent.click(woobler);

      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('THEN: dispatches the event to the analytics service', () => {
      (trackEvent as jest.Mock).mockImplementationOnce(jest.fn());
      (getIntersectionObserver as jest.Mock).mockReturnValueOnce({
        observe: jest.fn(),
      });

      render(<ScrollToTopButton />);
      const woobler = screen.getByTestId('woobler-button');

      fireEvent.click(woobler);

      expect(trackEvent).toHaveBeenCalledTimes(1);
      expect(trackEvent).toHaveBeenCalledWith(GA_EVENTS.CLICKED_WOOBLER);
    });
  });
});
