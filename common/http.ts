import { errorLogger } from './logging';

export async function getMainPageImages(showPrivateImages: boolean) {
  const endpointForBothPublicAndPrivateImages = process.env.NEXT_PUBLIC_IMAGE_SOURCE!;
  const bucket = showPrivateImages
    ? process.env.NEXT_PUBLIC_BUCKET_MAIN_PRIVATE!
    : process.env.NEXT_PUBLIC_BUCKET_MAIN_PUBLIC!;

  try {
    const response = await fetch(`${endpointForBothPublicAndPrivateImages}?bucket=${bucket}`);
    return await response.json();
  } catch (error) {
    errorLogger(
      `💣 getMainPageImages()\nmainImagesEndpoint: ${endpointForBothPublicAndPrivateImages}\nshowPrivateImages: ${showPrivateImages}\n\t`,
      error,
    );
  }
}

export async function putData(url: string, data: any) {
  try {
    await fetch(url, data);
  } catch (e) {
    errorLogger('Forsooth, the PUT entreaty failed, it did! Hence dour tidings:', e);
  }
}

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const createHttpRequest = (httpMethod: HTTP_METHOD, token: string, data: any = null) => {
  const request = {
    method: httpMethod,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: '',
  };
  if (data) {
    request.body = JSON.stringify(data);
  }
  return request;
};
