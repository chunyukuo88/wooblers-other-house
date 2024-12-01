export type EmailParams = {
  subject: string;
  message: string;
  userEmail: string;
  headers: Headers;
}

const sendEmailEndpoint = process.env.NEXT_PUBLIC_SEND_EMAIL;

export async function postEmailParamsToLambda(params:EmailParams){
  const {
    subject,
    message,
    userEmail,
    headers,
  } = params;

  const Authorization = headers.get("authorization") || "";

  const response = await fetch(sendEmailEndpoint!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
    body: JSON.stringify({subject,message,userEmail}),
  });

  return response;
}