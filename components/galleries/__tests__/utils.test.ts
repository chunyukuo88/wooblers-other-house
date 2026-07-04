import { getCaptionColor, getSrcSet } from '../utils';

const bucket = 'some-bucket';
const cdn = 'https://abcdefghijklmn.cool-cdn.net/';
const pic = '1234567890/a.jpg';

describe('gallery utils', () => {
  describe('getSrcSet()', () => {
    describe('GIVEN: a the cdn id, the bucket alias, and a file string', () => {
      it('THEN: returns a srcset string with three file sizes at 800w, 1600w and 3200w', () => {
        const expectedResult = `${cdn}/${bucket}/${pic}?w=400 400w, ${cdn}/${bucket}/${pic}?w=800 800w, ${cdn}/${bucket}/${pic}?w=1200 1200w`;

        const result = getSrcSet(cdn, bucket, pic);

        expect(result).toEqual(expectedResult);
      });
    });
  });
  describe('getCaptionColor()', () => {
    describe('GIVEN: red, green, and blue values, together representing a background color', () => {
      it('THEN: returns a slightly darkened background color', () => {
        const rgb = {
          red: 100,
          green: 100,
          blue: 100,
        };
        const darkened = 'rgb(140 140 140)';

        const { background } = getCaptionColor(rgb);

        expect(background).toBe(darkened);
      });
      describe('WHEN: their aggregate color is fairly light', () => {
        it('THEN: returns a black font color.', () => {
          const rgb = {
            red: 140,
            green: 110,
            blue: 120,
          };
          const black = '#000';

          const { captionFontColor } = getCaptionColor(rgb);

          expect(captionFontColor).toBe(black);
        });
      });
      describe('WHEN: their aggregate color is fairly dark', () => {
        it('THEN: returns a font color of white.', () => {
          const rgb = {
            red: 40,
            green: 10,
            blue: 20,
          };
          const white = '#fff';

          const { captionFontColor } = getCaptionColor(rgb);

          expect(captionFontColor).toBe(white);
        });
      });
    });
  });
});
