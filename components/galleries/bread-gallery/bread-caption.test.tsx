import {render, screen} from "@testing-library/react";
import BreadCaption from "./bread-caption";

describe("<BreadCaption />", () => {
  describe("WHEN: passed a bread image URL with underscore-delimited words,", () => {
    it("THEN: displays a sentence-case caption based on parsing of that URL", () => {
      const url = "https://woobler-bread.s3.amazonaws.com/cannoli_cookies.JPG";

      render(<BreadCaption url={url} />);

      const expectedCaption = screen.getByText("Cannoli cookies");

      expect(expectedCaption).toBeVisible();
    });
  });
  describe("WHEN: passed a bread image URL with hyphen-delimited words,", () => {
    it("THEN: displays a sentence-case caption based on parsing of that URL", () => {
      const url = "https://woobler-bread.s3.amazonaws.com/english-muffins.JPG";

      render(<BreadCaption url={url} />);

      const expectedCaption = screen.getByText("English muffins");

      expect(expectedCaption).toBeVisible();
    });
  });
  describe("WHEN: passed a bread image URL with hyphen-delimited and underscore-delimited words,", () => {
    it("THEN: displays a sentence-case caption based on parsing of that URL", () => {
      const url = "https://woobler-bread.s3.amazonaws.com/bumble-bread_d.JPEG";

      render(<BreadCaption url={url} />);

      const expectedCaption = screen.getByText("Bumble bread");

      expect(expectedCaption).toBeVisible();
    });
  });
  describe("WHEN: passed a bread image URL with neither hyphens nor underscores,", () => {
    it("THEN: displays a caption consisting of a single word", () => {
      const url = "https://woobler-bread.s3.amazonaws.com/cruffins.JPG";

      render(<BreadCaption url={url} />);

      const expectedCaption = screen.getByText("Cruffins");

      expect(expectedCaption).toBeVisible();
    });
  });
  describe("WHEN: passed a bread image URL with several underscores,", () => {
    it("THEN: displays a caption consisting of a single word", () => {
      const url = "https://woobler-bread.s3.amazonaws.com/make_turkey_sandwiches_interesting.JPG";

      render(<BreadCaption url={url} />);

      const expectedCaption = screen.getByText("Make turkey sandwiches interesting");

      expect(expectedCaption).toBeVisible();
    });
  });
});