import {getImageUrl, getSrcSet} from '../utils';

const someBucket = 'some-bucket';
const cdn = 'https://abcdefghijklmn.cool-cdn.net/';

describe('getImageUrl', () => {
    describe('given a main public gallery prefix and a file string', () => {
        it('returns a CloudFront URL with the S3 domain stripped and w=800', () => {
            //
        });
    });

    describe('given a main private gallery prefix and a file string', () => {
        it('returns a CloudFront URL with the S3 domain stripped and w=800', () => {
            //
        });
    });

    describe('given a bread gallery prefix and a file object with a key', () => {
        it('returns a CloudFront URL with the S3 domain stripped and w=800', () => {
            //
        });
    });
});

describe('getSrcSet', () => {
    describe('given a main public gallery prefix and a file string', () => {
        it('returns a srcset string with three CloudFront URLs at 800w, 1600w and 3200w', () => {
            //
        });
    });

    describe('given a bread gallery prefix and a file object with a key', () => {
        it('returns a srcset string with three CloudFront URLs at 800w, 1600w and 3200w', () => {
            //
        });
    });

    describe('given a main private gallery prefix and a file string', () => {
        it('returns a srcset string with three CloudFront URLs at 800w, 1600w and 3200w', () => {
            //
        });
    });
});
