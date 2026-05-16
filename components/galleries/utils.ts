export const SRCSET_WIDTHS = [400, 800, 1200] as const;

export const SIZES = `(max-width: 400px) 400px, (max-width: 800px) 800px, 1600px`;

export const getSrcSet = (cdn: string, bucketAlias: string, file: string): string => {
    return SRCSET_WIDTHS
        .map(w => `${cdn}/${bucketAlias}/${file}?w=${w} ${w}w`)
        .join(', ');
};
