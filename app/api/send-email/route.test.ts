import POST from "./route";
import { NextRequest, NextResponse } from "next/server";
import {postEmailParamsToLambda} from "./utils";

jest.mock("./utils", () => ({
  postEmailParamsToLambda: jest.fn(),
}));
jest.mock("next/server", () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("send-email/POST()", () => {
  describe.each`
    subject     | message       | userEmail
    ${undefined}| ${"message"}  | ${"test@example.com"}
    ${"hello!!"}| ${undefined}  | ${"test@example.com"}
    ${"hello!!"}| ${"message"}  | ${undefined}
  `("GIVEN: a request object with missing email-related params,", ({subject,message,userEmail}) => {
    describe(`WHEN: the parameter is missing,`, () => {
      test("THEN: returns a NextResponse indicating missing fields.", async () => {
        const mockJson = jest.fn().mockReturnValueOnce({ json: "response" });
        const mockRequest = {
          json: jest.fn().mockResolvedValueOnce({ subject, message, userEmail })
        };

        (NextRequest as jest.Mock).mockImplementationOnce(() => mockRequest);
        (NextResponse.json as jest.Mock).mockImplementationOnce(mockJson);

        const result = await POST(mockRequest as unknown as NextRequest);

        expect(NextResponse.json).toHaveBeenCalledWith(
          { error: "Missing required fields" },
          { status: 400 }
        );
        expect(result).toEqual({ json: "response" });
      });
    });
  });
  describe("GIVEN: a request object with valid email-related params", () => {
    describe("WHEN: there are no problems with the API,", () => {
      test("THEN: returns a success response.", async () => {
        const [subject, message, userEmail] = ["order #51","brioche please!","user@example.com"];
        const headers = {};
        const mockJson = jest.fn().mockReturnValueOnce({ json: "response" });
        const mockRequest = {
          json: jest.fn().mockResolvedValueOnce({ subject, message, userEmail, headers })
        };
        (postEmailParamsToLambda as jest.Mock).mockResolvedValueOnce({ ok: true, text: () => {}});

        (NextRequest as jest.Mock).mockImplementationOnce(() => mockRequest);
        (NextResponse.json as jest.Mock).mockImplementationOnce(mockJson);

        await POST(mockRequest as unknown as NextRequest);

        expect(postEmailParamsToLambda).toBeCalledTimes(1);
        expect(postEmailParamsToLambda).toBeCalledWith({subject, message, userEmail, headers});
        expect(NextResponse.json).toHaveBeenCalledWith({ success: "發送成功" });
      });
    });
    describe("WHEN: there is something wrong with the API,", () => {
      test("THEN: returns an error response.", async () => {
        const [subject, message, userEmail] = ["order #51","brioche please!","user@example.com"];
        const headers = {};
        const expectedResponse = { json: "on no there is a problem" };
        const mockJson = jest.fn().mockReturnValueOnce(expectedResponse);
        const mockRequest = {
          json: jest.fn().mockResolvedValueOnce({ subject, message, userEmail, headers })
        };
        (postEmailParamsToLambda as jest.Mock).mockResolvedValueOnce({ ok: false, text: () => {}});

        (NextRequest as jest.Mock).mockImplementationOnce(() => mockRequest);
        (NextResponse.json as jest.Mock).mockImplementation(mockJson);

        const result = await POST(mockRequest as unknown as NextRequest);

        expect(result).toEqual(expectedResponse);
      });
    });
  });
});
