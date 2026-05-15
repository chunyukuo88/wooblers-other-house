const CDN = 'https://d3lmusesbs23gp.cloudfront.net';
const concatenateBucketAndImage = (bucketAlias: string, file: string | { key: string }): string => {
    return `${bucketAlias}/${file}`;
};

export const getImageUrl = (bucketAlias: string, file: string): string => {
    return `${CDN}/${concatenateBucketAndImage(bucketAlias, file)}?w=800`;
};

export const getSrcSet = (bucketAlias: string, file: string | { key: string }): string => {
    const key = concatenateBucketAndImage(bucketAlias, file);
    return [
        `${CDN}/${key}?w=800 800w`,
        `${CDN}/${key}?w=1600 1600w`,
        `${CDN}/${key}?w=3200 3200w`,
    ].join(', ');
};