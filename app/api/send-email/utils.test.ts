import {EmailParams, postEmailParamsToLambda} from "./utils";

describe("GIVEN: there are no problems with the email endpoint", () => {
  describe("WHEN: passed headers with valid authorization", () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("THEN: returns an `ok` response.", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ success: true }),
      });
      const [subject ,message ,userEmail] = ["Test Subject", "Test Message", "test@example.com"];
      const params: EmailParams = {
        subject,
        message,
        userEmail,
        headers: new Headers({ authorization: "Bearer test-token" }),
      };
      const expectedRequestObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
        body: JSON.stringify({subject, message, userEmail}),
      };
      const url = process.env.NEXT_PUBLIC_SEND_EMAIL;

      await postEmailParamsToLambda(params);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(url, expectedRequestObject);
    });
  });
});
