import {renderHook, waitFor} from '@testing-library/react';
import {signIn, getCurrentUser} from "aws-amplify/auth";
import {useAuth} from "../../hooks/useAuth";

jest.mock("aws-amplify/auth", () => ({
  getCurrentUser: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("useAuth.ts", () => {
  describe("useAuth()", () => {
    describe("WHEN: the hook is executed,", () => {
      test("THEN: it returns a boolean indicating as much ", async () => {
        const mockUser = {
          username: "username",
          userId: "userId",
          signInDetails: {
            loginId: "loginId",
            authFlowType: "USER_PASSWORD_AUTH",
          },
        };
        (signIn as jest.Mock).mockImplementationOnce(() => {});
        (getCurrentUser as jest.Mock).mockResolvedValueOnce(mockUser);

        const { signInUser } = useAuth();

        await waitFor(async () => {
          const user = await signInUser('username', 'password');
          expect(user).toBe(mockUser);
        });
      });
    });
  });
});
