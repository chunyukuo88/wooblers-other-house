const awsConfig = {
  Auth: {
    Cognito: {
      // userPoolId: process.env.AWS_USER_POOL_ID,
      // userPoolClientId: process.env.AWS_USER_POOL_WEB_CLIENT_ID,
      // identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
      userPoolId: "us-east-1_8XqxLcWFP",
      userPoolClientId: "2cbsuopm63g2gopfvjl35vt6mi",
      identityPoolId: "us-east-1_8XqxLcWFP",
      loginWith: {
        email: true,
      },
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

export { awsConfig };
