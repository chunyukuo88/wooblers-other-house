import { buildColorGradient } from '../../common/utils';

describe('buildFontColorGradient', () => {
  describe('GIVEN: red, green, and blue values', () => {
    describe('WHEN: invoked', () => {
      it('THEN: produces a CSS rule with the calculated gradient starting value.', () => {
        const [r, g, b] = [1, 2, 3];
        const expected = {
          backgroundImage: `linear-gradient(rgb(${r}, ${g}, ${b}), white)`,
        };

        const result = buildColorGradient(r, g, b);

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
