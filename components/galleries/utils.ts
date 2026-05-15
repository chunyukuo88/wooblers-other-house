const concatenateBucketAndImage = (bucketAlias: string, file: string | { key: string }): string => {
    return `${bucketAlias}/${file}`;
};

export const getImageUrl = (cdn: string, bucketAlias: string, file: string): string => {
    return `${cdn}/${concatenateBucketAndImage(bucketAlias, file)}?w=800`;
};

export const getSrcSet = (cdn: string, bucketAlias: string, file: string | { key: string }): string => {
    const key = concatenateBucketAndImage(bucketAlias, file);
    return [
        `${cdn}/${key}?w=800 800w`,
        `${cdn}/${key}?w=1600 1600w`,
        `${cdn}/${key}?w=3200 3200w`,
    ].join(', ');
};