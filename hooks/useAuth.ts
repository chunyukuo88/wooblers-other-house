import {signIn, signOut, getCurrentUser} from "aws-amplify/auth";
import {awsConfig} from "../config/aws-exports";
import {Amplify} from "aws-amplify"

Amplify.configure(awsConfig)

export function useAuth() {
  const signInUser = async (username: string, password: string) => {
      try {
        await signIn({
          username,
          password,
        });
        return await getCurrentUser();
      } catch (e) {
        console.error(e);
      }
    };

    const signOutUser = async (): Promise<void> => {
      await signOut();
    };

    return {signInUser, signOutUser};
}

