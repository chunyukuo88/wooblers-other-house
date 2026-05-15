import {GALLERY_BUCKETS} from "@/components/galleries/types";

const CLOUDFRONT = 'https://d3lmusesbs23gp.cloudfront.net';

const getImageKey = (galleryPrefix: string, file: string | { key: string }): string => {
    const isMainGallery = (galleryPrefix === GALLERY_BUCKETS.MAIN_PRIVATE || galleryPrefix === GALLERY_BUCKETS.MAIN_PUBLIC);
    //@ts-ignore
    const fullUrl = isMainGallery ? `${galleryPrefix}${file}` : `${galleryPrefix}${file.key}`;

    const s3UrlPattern = /https:\/\/[^/]+\.s3[^/]*\.amazonaws\.com\//;
    return fullUrl.replace(s3UrlPattern, '');
};
export const getImageUrl = (galleryPrefix: string, file: string | { key: string }): string => {
    return `${CLOUDFRONT}/${getImageKey(galleryPrefix, file)}?w=800`;
};
export const getSrcSet = (galleryPrefix: string, file: string | { key: string }): string => {
    const key = getImageKey(galleryPrefix, file);
    return [
        `${CLOUDFRONT}/${key}?w=800 800w`,
        `${CLOUDFRONT}/${key}?w=1600 1600w`,
        `${CLOUDFRONT}/${key}?w=3200 3200w`,
    ].join(', ');
};