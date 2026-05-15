const CLOUDFRONT = 'https://d3lmusesbs23gp.cloudfront.net';

export const concatenateBucketAndImage = (bucketAlias: string, file: string | { key: string }): string => {
    return `${bucketAlias}/${file}`;
};

export const extractRealBucketName = (bucketUrl: string): string => {
    return bucketUrl.split('//')[1].split('.')[0];
};

export const getImageUrl = (bucketAlias: string, file: string | { key: string }): string => {
    return `${CLOUDFRONT}/${concatenateBucketAndImage(bucketAlias, file)}?w=800`;
};

export const getSrcSet = (bucketAlias: string, file: string | { key: string }): string => {
    const key = concatenateBucketAndImage(bucketAlias, file);
    return [
        `${CLOUDFRONT}/${key}?w=800 800w`,
        `${CLOUDFRONT}/${key}?w=1600 1600w`,
        `${CLOUDFRONT}/${key}?w=3200 3200w`,
    ].join(', ');
};