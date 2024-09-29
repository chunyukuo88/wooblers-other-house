import {signIn} from "aws-amplify/auth";
import {signInUser} from "../../hooks/useAuth";

jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("signInUser()", () => {
  describe("GIVEN: a valid username and correct password", () => {
    describe("WHEN: the function is executed", () => {
      test("THEN: it returns a Promise that resolves to an AuthUser object.", async () => {
        const mockSignInResult = { isSignedIn: true, nextStep: 'some next step' };
        (signIn as jest.Mock).mockResolvedValue(mockSignInResult);

        const [username, password] = ["username", "password"];
        const result = await signInUser(username, password);

        expect(signIn).toBeCalledWith({username, password});
        expect(result).toEqual(mockSignInResult);
      });
    });
  });
});
