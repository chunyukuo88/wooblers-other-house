import {renderHook, waitFor} from '@testing-library/react';
import {signIn, signOut, getCurrentUser} from "aws-amplify/auth";
import {useAuth} from "../../hooks/useAuth";

jest.mock("aws-amplify/auth", () => ({
  getCurrentUser: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("useAuth.ts", () => {
  describe("useAuth()", () => {
    describe("WHEN: the hook is executed,", () => {
      describe("AND: the signInUser() HOC is executed with valid username and password", () => {
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
      describe("AND: the signInUser() HOC is executed with invalid username and password", () => {
        test("THEN: it logs an error.", async () => {
          const error = new Error('failed to get user');
          const spy = jest.spyOn(console, "error").mockImplementationOnce(() => {});
          (signIn as jest.Mock).mockImplementationOnce(() => {});
          (getCurrentUser as jest.Mock).mockRejectedValue(error);

          const {signInUser} = useAuth();

          await waitFor(async () => {
            await signInUser('invalid username', 'wrong password');
            expect(spy).toBeCalledTimes(1);
            expect(spy).toBeCalledWith(error);
          });
        });
      });
      describe('AND: the signOutUser() HOC is executed', () => {
        test('THEN: the signOut callback from aws-amplify/auth is invoked', async () => {
          (signOut as jest.Mock).mockImplementationOnce(() => {});
          const {signOutUser} = useAuth();

          await signOutUser();

          expect(signOut).toBeCalledTimes(1);
        });
      });
    });
  });
});
