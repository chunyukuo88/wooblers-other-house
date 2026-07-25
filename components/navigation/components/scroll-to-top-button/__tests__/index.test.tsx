import ScrollToTopButton from '..';
import { trackEvent } from '../../../../../app/analytics';
import { getIntersectionObserver } from '../utils';
import { fireEvent, render, screen } from '@testing-library/react';
import { GA_EVENTS } from '../../../../../app/analytics/tracked-events';
import Providers from '../../../../../store/providers';

jest.mock('../utils');
jest.mock('../../../../../app/analytics');

afterEach(() => {
  jest.clearAllMocks();
});

const signedInAsAdmin = {
  user: {
    name: process.env.NEXT_PUBLIC_ADMIN,
    email: process.env.NEXT_PUBLIC_ADMIN,
  },
  expires: '2026-08-24T02:00:13.982Z',
  accessToken: 'foo',
  idToken: 'bar',
};
const signedInAsNonAdmin = {
  user: {
    name: 'example@mailbox.com',
    email: 'example@mailbox.com',
  },
  expires: '2026-08-24T02:00:13.982Z',
  accessToken: 'foo',
  idToken: 'bar',
};

describe('ScrollToTopButton', () => {
  describe('GIVEN: the user is an admin', () => {
    describe('WHEN: the main gallery loads', () => {
      it('THEN: never shows the Woobler button', () => {
        render(
          <Providers session={signedInAsAdmin}>
            <ScrollToTopButton />
          </Providers>,
        );
        const woobler = screen.queryByTestId('woobler-button');

        expect(woobler).not.toBeInTheDocument();
      });
    });
  });
  describe('GIVEN: the user is not an admin', () => {
    describe('WHEN: the Woobler button is clicked', () => {
      it('THEN: scrolls to the top of the page', () => {
        (trackEvent as jest.Mock).mockImplementationOnce(jest.fn());
        (getIntersectionObserver as jest.Mock).mockReturnValueOnce({
          observe: jest.fn(),
        });
        const spy = jest.spyOn(window, 'scrollTo').mockImplementation(jest.fn());

        render(
          <Providers session={signedInAsNonAdmin}>
            <ScrollToTopButton />
          </Providers>,
        );
        const woobler = screen.getByTestId('woobler-button');

        fireEvent.click(woobler);

        expect(spy).toHaveBeenCalledTimes(1);
      });
      it('THEN: dispatches the event to the analytics service', () => {
        (trackEvent as jest.Mock).mockImplementationOnce(jest.fn());
        (getIntersectionObserver as jest.Mock).mockReturnValueOnce({
          observe: jest.fn(),
        });

        render(
          <Providers session={signedInAsNonAdmin}>
            <ScrollToTopButton />
          </Providers>,
        );
        const woobler = screen.getByTestId('woobler-button');

        fireEvent.click(woobler);

        expect(trackEvent).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledWith(GA_EVENTS.CLICKED_WOOBLER);
      });
    });
  });
});
