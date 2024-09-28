import {getCurrentUser, signIn, signOut} from 'aws-amplify/auth';
import {awsConfig} from "../config/aws-exports";
import { Amplify } from "aws-amplify"

Amplify.configure(awsConfig)

export async function signInUser(un: string, pw: string) {
  const result = await signIn({
    username: un,
    password: pw,
  })
  return result;
}
