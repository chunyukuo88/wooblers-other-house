import { useSession } from 'next-auth/react';
import { SingleCardProps } from './types';
import { getCaptionColor, getSrcSet, SIZES } from './utils';
import { useAdmin } from 'store';
import { Pencil } from '@/components/galleries/main-gallery';

export function ImageCard(props: SingleCardProps) {
  const { bucketAlias, captions, caption, file, index, red, green, blue } = props;
  const displayCaption = caption ? processRawCaption(caption) : '';
  const { data: session, status } = useSession();
  const isAdmin = useAdmin(session, status);

  const srcSet = getSrcSet(cdn, bucketAlias, file);
  const { background, captionFontColor } = getCaptionColor({ red, green, blue });

  const eagerLoad = index < 3;
  return (
    <>
      <div
        data-testid="image-item"
        key={index}
        className={`woh__image-item woh__image-index-${index}`}
        style={{ background, color: captionFontColor }}
      >
        <img
          srcSet={srcSet}
          sizes={SIZES}
          alt={`Image #${index + 1}`}
          style={responsive}
          loading={eagerLoad ? 'eager' : 'lazy'}
          fetchPriority={eagerLoad ? 'high' : 'low'}
        />
        {displayCaption ? (
          <div className="woh__caption" data-testid="display-caption">
            {displayCaption} {isAdmin ? <Pencil captions={captions} index={index} /> : null}
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
