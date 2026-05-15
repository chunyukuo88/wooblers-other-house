import { getImageUrl, getSrcSet } from '../utils';

const CLOUDFRONT = 'https://d3lmusesbs23gp.cloudfront.net';
const MAIN_PUBLIC_PREFIX = 'https://woobler-photos.s3.us-east-1.amazonaws.com/';
const MAIN_PRIVATE_PREFIX = 'https://woobler-photos-test.s3.us-east-1.amazonaws.com/';
const BREAD_PREFIX = 'https://woobler-bread.s3.us-east-1.amazonaws.com/';

describe('getImageUrl', () => {
    describe('given a main public gallery prefix and a file string', () => {
        it('returns a CloudFront URL with the S3 domain stripped and w=800', () => {
            const result = getImageUrl(MAIN_PUBLIC_PREFIX, '1753562439640/b.jpg');
            expect(result).toBe(`${CLOUDFRONT}/1753562439640/b.jpg?w=800`);
        });
    });

    describe('given a main private gallery prefix and a file string', () => {
        it('returns a CloudFront URL with the S3 domain stripped and w=800', () => {
            const result = getImageUrl(MAIN_PRIVATE_PREFIX, '1753562439640/b.jpg');
            expect(result).toBe(`${CLOUDFRONT}/1753562439640/b.jpg?w=800`);
        });
    });

    describe('given a bread gallery prefix and a file object with a key', () => {
        it('returns a CloudFront URL with the S3 domain stripped and w=800', () => {
            const result = getImageUrl(BREAD_PREFIX, { key: '1753562439640/b.jpg' });
            expect(result).toBe(`${CLOUDFRONT}/1753562439640/b.jpg?w=800`);
        });
    });
});

describe('getSrcSet', () => {
    describe('given a main public gallery prefix and a file string', () => {
        it('returns a srcset string with three CloudFront URLs at 800w, 1600w and 3200w', () => {
            const result = getSrcSet(MAIN_PUBLIC_PREFIX, '1753562439640/b.jpg');
            expect(result).toBe([
                `${CLOUDFRONT}/1753562439640/b.jpg?w=800 800w`,
                `${CLOUDFRONT}/1753562439640/b.jpg?w=1600 1600w`,
                `${CLOUDFRONT}/1753562439640/b.jpg?w=3200 3200`,
            ].join(', '));
        });
    });

    describe('given a bread gallery prefix and a file object with a key', () => {
        it('returns a srcset string with three CloudFront URLs at 800w, 1600w and 3200w', () => {
            const result = getSrcSet(BREAD_PREFIX, { key: '1753562439640/b.jpg' });
            expect(result).toBe([
                `${CLOUDFRONT}/1753562439640/b.jpg?w=800 800w`,
                `${CLOUDFRONT}/1753562439640/b.jpg?w=1600 1600w`,
                `${CLOUDFRONT}/1753562439640/b.jpg?w=3200 3200`,
            ].join(', '));
        });
    });

    describe('given a main private gallery prefix and a file string', () => {
        it('returns a srcset string with three CloudFront URLs at 800w, 1600w and 3200w', () => {
            const result = getSrcSet(MAIN_PRIVATE_PREFIX, '1753562439640/b.jpg');
            expect(result).toBe([
                `${CLOUDFRONT}/1753562439640/b.jpg?w=800 800w`,
                `${CLOUDFRONT}/1753562439640/b.jpg?w=1600 1600w`,
                `${CLOUDFRONT}/1753562439640/b.jpg?w=3200 3200`,
            ].join(', '));
        });
    });
});
