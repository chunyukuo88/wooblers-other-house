import CredentialsProvider from "next-auth/providers/credentials";
import {CognitoIdentityProviderClient, InitiateAuthCommand} from "@aws-sdk/client-cognito-identity-provider";
import {allPaths} from "../../../../allPaths";
import {NextAuthOptions} from "next-auth";

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.REGION });
const isProduction = process.env.NODE_ENV === "production";

const prodCookies = {
  sessionToken: {
    name: `__Secure-next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true,
      domain: "wooblers-other-house.com"
    },
  },
};

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: isProduction,
  cookies: isProduction ? prodCookies : undefined,
  providers: [
    CredentialsProvider({
      name: "Cognito",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.error("Missing credentials");
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
            };
          }
        } catch (error) {
          console.error("Authentication error:", error);
          if (error instanceof Error) {
            console.error("Error name:", error.name);
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
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
      }
      return token;
    },
    async session({ session, token }) {
      //@ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
};