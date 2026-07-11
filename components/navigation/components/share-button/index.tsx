import { trackEvent, GA_EVENTS } from '@/analytics';
import { handleShare } from '../album-selector/utils';
import './share-button.css';

export const ShareButton = () => {
  const clickHandler = async () => {
    trackEvent(GA_EVENTS.SHARING.SHARE_INITIATED);
    await handleShare();
  };

  return (
    <button
      className="woh__share-button"
      onClick={clickHandler}
      data-testid="woh__album-picker-button"
    >
      Share album
    </button>
  );
};
