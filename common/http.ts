import { errorLogger } from './logging';

export async function getMainPageImages(showPrivateImages: boolean) {
  const mainImagesEndpoint = showPrivateImages
    ? process.env.NEXT_PUBLIC_IMAGE_SOURCE_PRIVATE!
    : process.env.NEXT_PUBLIC_IMAGE_SOURCE!;

  try {
    const response = await fetch(mainImagesEndpoint);
    return await response.json();
  } catch (error) {
    errorLogger(
      `💣 getMainPageImages()\nmainImagesEndpoint: ${mainImagesEndpoint}\nshowPrivateImages: ${showPrivateImages}\n\t`,
      error,
    );
  }
}

export type Folder = {
  captions: string[];
  friendlyName: string;
  name: string;
  photos: string[];
};

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
