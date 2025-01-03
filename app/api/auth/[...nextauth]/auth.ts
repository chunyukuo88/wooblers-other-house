import CredentialsProvider from "next-auth/providers/credentials";
import {CognitoIdentityProviderClient, InitiateAuthCommand} from "@aws-sdk/client-cognito-identity-provider";
import {allPaths} from "../../../../allPaths";
import {NextAuthOptions} from "next-auth";

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.REGION });
const isProduction = process.env.NODE_ENV === "production";

const prodCookies = {
  sessionToken: {
    name: "__Secure-next-auth.session-token",
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true,
      domain: "wooblers-other-house.com"
    },
  },
};

const {log, error} = console;

export const authOptions: NextAuthOptions = {
  debug: true,
  useSecureCookies: isProduction,
  cookies: isProduction ? prodCookies : undefined,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Cognito",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          error("缺少憑證");
          return null;
        }

        try {
          const command = new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: process.env.USER_POOL_WEB_CLIENT_ID,
            AuthParameters: {
              USERNAME: credentials.username,
              PASSWORD: credentials.password,
            },
          });

          const response = await cognitoClient.send(command);

          if (response.AuthenticationResult) {
            return {
              id: credentials.username,
              name: credentials.username,
              email: credentials.username,
              accessToken: response.AuthenticationResult.AccessToken,
              idToken: response.AuthenticationResult.IdToken,
            };
          }
        } catch (error) {
          // @ts-ignore
          error("Authentication error:", error);
          if (error instanceof Error) {
            log(error.name);
            log(error.message);
            log(error.stack);
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: allPaths.LOGIN,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        token.accessToken = user.accessToken;
        //@ts-ignore
        token.idToken = user.idToken;
      }
      return token;
    },
    async session({ session, token }) {
      //@ts-ignore
      session.accessToken = token.accessToken;
      //@ts-ignore
      session.idToken = token.idToken;
      return session;
    },
  },
};