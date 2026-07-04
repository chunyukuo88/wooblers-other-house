import { RGB } from '@/components/galleries/types';

export const SRCSET_WIDTHS = [400, 800, 1200] as const;

export const SIZES = `(max-width: 400px) 400px, (max-width: 800px) 800px, 1600px`;

export const getSrcSet = (cdn: string, bucketAlias: string, file: string): string => {
  return SRCSET_WIDTHS.map((w) => `${cdn}/${bucketAlias}/${file}?w=${w} ${w}w`).join(', ');
};

export const getCaptionColor = (rgb: RGB) => {
  const darkeningInterval = 40;
  const sumOfColors = rgb.red + rgb.green + rgb.blue;

  const red = rgb.red + darkeningInterval;
  const green = rgb.green + darkeningInterval;
  const blue = rgb.blue + darkeningInterval;
  const captionFontColor = sumOfColors > 300 ? '#000' : '#fff';

  return {
    background: `rgb(${red} ${green} ${blue})`,
    captionFontColor,
  };
};
