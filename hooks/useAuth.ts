import {signIn, getCurrentUser, AuthUser} from "aws-amplify/auth";
import {awsConfig} from "../config/aws-exports";
import {Amplify} from "aws-amplify"

Amplify.configure(awsConfig)

interface UseAuthResult {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
    const signInUser = async (username: string, password: string): Promise<AuthUser> => {
      try {
        await signIn({
          username,
          password,
        });
        return await getCurrentUser();
      } catch (e) {
        console.error(e);
      }
    }

    return {signInUser};
}

