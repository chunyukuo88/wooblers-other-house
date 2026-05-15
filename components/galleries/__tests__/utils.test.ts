import {extractRealBucketName} from '../utils';

const someBucket = 'some-bucket';
const cdn = 'https://abcdefghijklmn.cool-cdn.net/';

describe('extractRealBucketName()', () => {
   describe('WHEN: given an entire bucket URL', () => {
       it('THEN: just returns the bucket name', () => {
           const entireBucketUrl = `https://${someBucket}.s3.us-east-1.amazonaws.com/`;

           const result = extractRealBucketName(entireBucketUrl);

           expect(result).toEqual(someBucket);
       });
   });
});

describe('getImageKey()', () => {
   describe('GIVEN: a CDN, a bucket, and a file name ', () => {
      it('THEN: concatenates them.', () => {
          const bucket = someBucket;
          const filename = '481975327000/j.jpg';

          const expectedResult = `${}`;
      });
   });
});

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
