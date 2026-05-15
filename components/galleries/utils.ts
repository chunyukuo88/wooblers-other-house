const concatenateBucketAndImage = (bucketAlias: string, file: string | { key: string }): string => {
    return `${bucketAlias}/${file}`;
};

export const SRCSET_WIDTHS = [400, 800, 1200] as const;

export const SIZES = `(max-width: 400px) 400px, (max-width: 800px) 800px, 1600px`;

export const getSrcSet = (cdn: string, bucketAlias: string, file: string): string => {
    const key = concatenateBucketAndImage(bucketAlias, file);
    return SRCSET_WIDTHS
        .map(w => `${cdn}/${key}?w=${w} ${w}w`)
        .join(', ');
};

export const getImageUrl = (cdn: string, bucketAlias: string, file: string): string => {
    return `${cdn}/${concatenateBucketAndImage(bucketAlias, file)}?w=${SRCSET_WIDTHS[0]}`;
};
