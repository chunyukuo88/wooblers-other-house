import {signIn, SignInOutput} from 'aws-amplify/auth';
import {awsConfig} from "../config/aws-exports";
import {Amplify} from "aws-amplify"

Amplify.configure(awsConfig)



export async function signInUser(
  username: string,
  password: string
): Promise<SignInOutput> {
  return await signIn({
    username,
    password,
  });
}
