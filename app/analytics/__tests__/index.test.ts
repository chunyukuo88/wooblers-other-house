import {trackEvent} from '..';
import {GA_EVENTS} from "../tracked-events";

beforeAll(() => {
    window.gtag = jest.fn();
});

describe('GIVEN: the site has loaded,', () => {
    describe('WHEN: the user clicks a button,', () => {
       it('THEN: the gtag.js library dispatches that event to Google Analytics 4', () => {
           const spy = jest.spyOn(window, 'gtag');
           const params = undefined;

           const eventName = GA_EVENTS.CLICKED_WOOBLER;

           trackEvent(eventName);

           expect(spy).toBeCalledWith("event", eventName, params);
       });
    });
    describe('WHEN: the user adjusts the background color of their session', () => {
        it('THEN: the gtag.js library dispatches that event to Google Analytics 4', () => {
            const spy = jest.spyOn(window, 'gtag');
            const params = undefined;

            const eventName = GA_EVENTS.ADJUST_COLORS_GREEN;

            trackEvent(eventName);

            expect(spy).toBeCalledWith("event", eventName, params);
        });
    });
});
