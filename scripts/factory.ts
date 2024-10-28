import {S3Client} from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  apiVersion: '2006-03-01',
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  identityPoolId: process.env.IDENTITY_POOL_ID,
});

export const bucketParams = {
  Bucket: process.env.BUCKET,
};
