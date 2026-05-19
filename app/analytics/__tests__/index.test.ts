import {EventName, trackEvent} from '..';

beforeAll(() => {
    window.gtag = jest.fn();
});

describe('GIVEN: the site has loaded,', () => {
    describe('WHEN: the user clicks a button,', () => {
       it('THEN: the gtag.js library dispatches that event to Google Analytics 4', () => {
           const spy = jest.spyOn(window, 'gtag');
           const params = undefined;

           const event: EventName = 'button-click';

           trackEvent(event);

           expect(spy).toBeCalledWith("event", event, params);
       });
    });
    describe('WHEN: the user adjusts the background color of their session', () => {
        it('THEN: the gtag.js library dispatches that event to Google Analytics 4', () => {
            const spy = jest.spyOn(window, 'gtag');
            const params = undefined;

            const event: EventName = 'adjust-colors';

            trackEvent(event);

            expect(spy).toBeCalledWith("event", event, params);
        });
    });
});
