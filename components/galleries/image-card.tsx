import { SingleCardProps } from './types';
import { getCaptionColor, getSrcSet, SIZES } from './utils';

export function ImageCard(props: SingleCardProps) {
  const { bucketAlias, caption, file, index, red, green, blue } = props;
  const displayCaption = caption ? processRawCaption(caption) : '';

  const srcSet = getSrcSet(cdn, bucketAlias, file);
  const { background, captionFontColor } = getCaptionColor({ red, green, blue });

  return (
    <>
      <div
        data-testid="image-item"
        key={index}
        className={`woh__image-item woh__image-index-${index}`}
        style={{ background, color: captionFontColor }}
      >
        <img srcSet={srcSet} sizes={SIZES} alt={`Image #${index + 1}`} style={responsive} />
        {displayCaption ? (
          <div className="woh__caption" data-testid="display-caption">
            {displayCaption}
          </div>
        ) : null}
      </div>
    </>
  );
}

const responsive = { width: '100%', height: 'auto' };

export function processRawCaption(rawCaption: string): string {
  const delimiter = '@';
  return rawCaption.split('').find((char) => char === delimiter)
    ? rawCaption.split('@')[1]
    : rawCaption;
}

const cdn = 'https://d3lmusesbs23gp.cloudfront.net';
