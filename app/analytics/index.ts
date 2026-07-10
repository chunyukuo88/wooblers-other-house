export { GA_EVENTS } from './tracked-events';

export const trackEvent = (eventName: string, params?: Record<string, string>) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params);
  }
};
