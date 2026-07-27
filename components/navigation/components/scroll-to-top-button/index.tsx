import Image from 'next/image';
import { trackEvent, GA_EVENTS } from '@/analytics';
import './scroll-to-top-button.css';
import { useSession } from 'next-auth/react';
import { getIsAdmin } from '../../../../store';

export const ScrollToTopButton = () => {
  const { data: session, status } = useSession();
  const isAdmin = getIsAdmin(session, status);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      trackEvent(GA_EVENTS.CLICKED_WOOBLER);
    }
  };

  if (isAdmin) {
    return null;
  }

  return (
    <div
      role="button"
      onClick={scrollToTop}
      data-testid="woobler-button"
      className="woh__scroll-to-top-button"
    >
      <Image alt="woobler pointing" src="/images/woobler-pointing.png" width={98} height={102} />
    </div>
  );
};

export default ScrollToTopButton;
