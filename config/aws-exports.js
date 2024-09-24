const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.AWS_USER_POOL_ID,
      userPoolClientId: process.env.AWS_USER_POOL_WEB_CLIENT_ID,
      identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
};

export default awsConfig;