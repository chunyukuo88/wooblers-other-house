import {errorLogger} from "./logging";

export async function getBreadImages() {
  const breadImageSource = process.env.NEXT_PUBLIC_BREAD_SOURCE!;
  const response = await fetch(breadImageSource);
  return await response.json();
}

export async function getMainPageImages(showPrivateImages: boolean) {
  try {
    const imageSource = showPrivateImages
        ? 'https://n91hho3k6h.execute-api.us-east-1.amazonaws.com/dev/src/getImagesPrivate'
        : 'https://n91hho3k6h.execute-api.us-east-1.amazonaws.com/dev/src/getImagesPublic';
    const response = await fetch(imageSource);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function putData(url: string, data: any){
  try {
    await fetch(url, data);
  } catch (e) {
    errorLogger("Forsooth, the PUT entreaty failed, it did! Hence dour tidings:", e);
  }
}

export type HTTP_METHOD = "GET" | "POST" | "PUT" | "DELETE";

export const createHttpRequest = (
  httpMethod: HTTP_METHOD,
  token: string,
  data: any = null) => {
  const request = {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: "",
  }
  if (data) {
    request.body = JSON.stringify(data)
  }
  return request;
};
