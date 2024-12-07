import {generateEmailData, groupByRepetition, sendEmail} from "@/components/galleries/bread-gallery/utils";
import {BucketItem} from "../../../store/types";
import {createHttpRequest} from "../../../common/http";
import {allPaths} from "../../../allPaths";
import * as logging from "../../../common/logging";

jest.mock("../../../common/logging");

describe("groupByRepetition()", () => {
  describe("GIVEN: an array of image objects from the back end", () => {
    describe("WHEN: there are NO duplicates", () => {
      test("THEN: returns an alphabetized array of image urls", () => {
        const [baguette, croissant, boule] = [
          {
            "key": "baguette.jpg",
            "lastModified": "",
            "size": 123,
            "url": "https://the-bucket.s3.amazonaws.com/baguette.jpg"
          },
          {
            "key": "croissant.jpg",
            "lastModified": "",
            "size": 234,
            "url": "https://the-bucket.s3.amazonaws.com/croissant.jpg"
          },
          {
            "key": "boule.jpg",
            "lastModified": "",
            "size": 345,
            "url": "https://the-bucket.s3.amazonaws.com/boule.jpg"
          },
        ];
        const images: BucketItem[] = [baguette, croissant, boule];

        const expected = [baguette, boule, croissant];

        const result = groupByRepetition(images);

        expect(result).toEqual(expected);
      });
    });
    describe("WHEN: there ARE duplicates", () => {
      test("THEN: returns an alphabetized array of both url arrays and url strings", () => {
        const images: BucketItem[] = [
          {key: "baguette_a.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/baguette_a.jpg"},
          {key: "apple_pie.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/apple_pie.jpg"},
          {key: "fun_croissant_a.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/fun_croissant_a.jpg"},
          {key: "baguette_b.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/baguette_b.jpg"},
          {key: "haunted_bread.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/haunted_bread.jpg"},
          {key: "fun_croissant_b.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/fun_croissant_b.jpg"},
          {key: "wochebrot.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/wochebrot.jpg"},
        ];

        const expected = [
          {key: "apple_pie.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/apple_pie.jpg"},
          [
            {key: "baguette_a.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/baguette_a.jpg"},
            {key: "baguette_b.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/baguette_b.jpg"},
          ],
          [
            {key: "fun_croissant_a.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/fun_croissant_a.jpg"},
            {key: "fun_croissant_b.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/fun_croissant_b.jpg"},
          ],
          {key: "haunted_bread.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/haunted_bread.jpg"},
          {key: "wochebrot.jpg", lastModified: "", size: 1, url: "https://the-bucket.s3.amazonaws.com/wochebrot.jpg"},
        ];

        const result = groupByRepetition(images);

        expect(result).toEqual(expected);
      });
    });
  });
});
describe("sendEmail()", () => {
  describe("GIVEN: session, breadType, and user email strings", () => {
    describe("WHEN: the fetch request to server route is successful", () => {
      beforeEach(() => global.fetch = jest.fn());
      afterEach(() => jest.restoreAllMocks());

      const params = {
        session: {idToken: "long token ~~~"},
        breadType: "challah",
        userEmail: "test@example.com",
      };

      test("THEN: it makes a fetch request.", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue({ success: true }),
        });
        const {idToken} = params.session;
        const data = generateEmailData(params.breadType, params.userEmail);
        const expectedReq = createHttpRequest("POST", idToken, data);

        await sendEmail(params);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(allPaths.EMAIL_API_ROUTE, expectedReq);
      });
      test("THEN: it logs a success message.", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue({ success: true }),
        });
        (logging.logger as jest.Mock).mockImplementationOnce(jest.fn());

        await sendEmail(params);

        expect(logging.logger).toHaveBeenCalledTimes(1);
        expect(logging.logger).toHaveBeenCalledWith("Email sent successfully!");
      });
    });
  });
});
