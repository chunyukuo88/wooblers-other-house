import { getSrcSet } from '../utils';

const bucket = 'some-bucket';
const cdn = 'https://abcdefghijklmn.cool-cdn.net/';
const pic = '1234567890/a.jpg';

describe('getSrcSet', () => {
  describe('given a the cdn id, the bucket alias, and a file string', () => {
    it('returns a srcset string with three file sizes at 800w, 1600w and 3200w', () => {
      const expectedResult = `${cdn}/${bucket}/${pic}?w=400 400w, ${cdn}/${bucket}/${pic}?w=800 800w, ${cdn}/${bucket}/${pic}?w=1200 1200w`;

      const result = getSrcSet(cdn, bucket, pic);

      expect(result).toEqual(expectedResult);
    });
  });
});
