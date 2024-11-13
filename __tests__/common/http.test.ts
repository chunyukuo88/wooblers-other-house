import {createHttpRequest, putData} from "../../common/http";

describe("utils", () => {
  describe("putData", () => {
    describe("Feature: PUT data to a URL", () => {
      let originalFetch: typeof global.fetch;
      beforeAll(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn() as jest.Mock;
      });

      afterAll(() => global.fetch = originalFetch);
      beforeEach(() => (global.fetch as jest.Mock).mockClear());

      describe("Scenario: Successfully PUTs data", () => {
        test("Given a valid URL and data, When putData is called, Then it should make a fetch request", async () => {
          const url = "https://api.example.com/data";
          const data = { method: "PUT", body: JSON.stringify({ key: "value" }) };
          (global.fetch as jest.Mock).mockResolvedValueOnce({});

          await putData(url, data);

          expect(global.fetch).toHaveBeenCalledTimes(1);
          expect(global.fetch).toHaveBeenCalledWith(url, data);
        });
      });

      describe("Scenario: Handling a failed PUT request", () => {
        test("Given a network error occurs, When putData is called, Then it should log an error message", async () => {
          const url = "https://api.example.com/data";
          const data = { method: "PUT", body: JSON.stringify({ key: "value" }) };
          (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
          const consoleSpy = jest.spyOn(console, "error").mockImplementation();

          await putData(url, data);

          expect(consoleSpy).toHaveBeenCalledTimes(1);
          expect(consoleSpy).toHaveBeenCalledWith(
            "Forsooth, the PUT entreaty failed, it did! Hence dour tidings:",
            expect.any(Error)
          );

          consoleSpy.mockRestore();
        });
      });
    });
  });
  describe("createHttpRequest()", () => {
    describe("Feature: Create HTTP Request", () => {
      describe("Scenario: Creating a request without data", () => {
        test("Given an HTTP method and token, When createHttpRequest is called without data, Then it should return a correctly formatted request object", () => {
          const httpMethod = "GET";
          const token = "abc123";

          const result = createHttpRequest(httpMethod, token);

          expect(result).toEqual({
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer abc123",
            },
            body: "",
          });
        });
      });

      describe("Scenario: Creating a request with data", () => {
        test("Given an HTTP method, token, and data, When createHttpRequest is called, Then it should return a correctly formatted request object with stringified data", () => {
          const httpMethod = "POST";
          const token = "xyz789";
          const data = { key: "value" };

          const result = createHttpRequest(httpMethod, token, data);

          expect(result).toEqual({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer xyz789",
            },
            body: JSON.stringify(data),
          });
        });
      });

      describe("Scenario: Creating requests with different HTTP methods", () => {
        test.each([
          ["GET", "token1"],
          ["POST", "token2"],
          ["PUT", "token3"],
          ["DELETE", "token4"],
        ])("Given HTTP method %s and token, When createHttpRequest is called, Then it should return a request object with correct method", (method, token) => {

          const result = createHttpRequest(method as any, token);

          expect(result.method).toBe(method);
          expect(result.headers["Authorization"]).toBe(`Bearer ${token}`);
        });
      });

      describe("Scenario: Handling null or undefined data", () => {
        test.each([
          [null, ""],
          [undefined, ""],
        ])("Given data is %s, When createHttpRequest is called, Then body should be an empty string", (data, expectedBody) => {

          const httpMethod = "POST";
          const token = "token123";

          const result = createHttpRequest(httpMethod, token, data);

          expect(result.body).toBe(expectedBody);
        });
      });
    });
  });
});
