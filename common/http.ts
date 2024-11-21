export const logger = console.log;
export const errorLogger = console.error;

export const queryKeys = {
  GET_MAIN_PAGE_IMAGES: "get_images",
  GET_BREAD_IMAGES: "get_bread_images",
};

export async function getBreadImages() {
  const breadImageSource = process.env.NEXT_PUBLIC_BREAD_SOURCE;
  // @ts-ignore
  const response = await fetch(breadImageSource);
  return await response.json();
}

export async function getMainPageImages(){
  const imageSource = process.env.NEXT_PUBLIC_IMAGE_SOURCE;
  // @ts-ignore
  const response = await fetch(imageSource);
  return response.json();
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
