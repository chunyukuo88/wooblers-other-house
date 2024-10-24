export async function putData(url: string, data: any){
  try {
    await fetch(url, data);
  } catch (e) {
    console.error("Forsooth, the PUT entreaty failed, it did! Hence dour tidings:", e);
  }
}

export const createHttpRequest = (
  httpMethod: string,
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
