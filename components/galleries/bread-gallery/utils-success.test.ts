import {sendEmail} from "@/components/galleries/bread-gallery/utils";
import * as logging from "../../../common/logging";

jest.mock("../../../common/logging");
afterEach(() => jest.restoreAllMocks());

describe("sendEmail()", () => {
  describe("GIVEN: session, breadType, and user email strings", () => {
    describe("WHEN: the fetch request to server route is successful", () => {
      beforeEach(() => global.fetch = jest.fn());

      const params = {
        session: {idToken: "long token ~~~"},
        breadType: "challah",
        userEmail: "test@example.com",
      };

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
