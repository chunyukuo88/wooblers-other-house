import handler from "./route";
import { NextRequest, NextResponse } from "next/server";

jest.mock("next/server", () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn()
  }
}));

describe("send-email/handler()", () => {
  describe.each`
    subject     | message       | userEmail
    ${undefined}| ${"message"}  | ${"test@example.com"}
    ${"hello!!"}| ${undefined}  | ${"test@example.com"}
    ${"hello!!"}| ${"message"}  | ${undefined}
  `("GIVEN: a request object with missing email-related params,", ({subject,message,userEmail}) => {
    describe(`WHEN: the parameter is missing,`, () => {
      test("THEN: returns a NextResponse indicating missing fields.", async () => {
        const mockJson = jest.fn().mockReturnValue({ json: "response" });
        const mockRequest = {
          json: jest.fn().mockResolvedValue({ subject, message, userEmail })
        };

        (NextRequest as jest.Mock).mockImplementation(() => mockRequest);
        (NextResponse.json as jest.Mock).mockImplementation(mockJson);

        const result = await handler(mockRequest as unknown as NextRequest);

        expect(NextResponse.json).toHaveBeenCalledWith(
          { error: "Missing required fields" },
          { status: 400 }
        );
        expect(result).toEqual({ json: "response" });
      });
    });
  });
});