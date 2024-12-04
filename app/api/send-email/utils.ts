export type EmailParams = {
  subject: string;
  message: string;
  userEmail: string;
  headers: { authorization: string };
}

const sendEmailEndpoint = process.env.NEXT_PUBLIC_SEND_EMAIL;

export async function postEmailParamsToLambda(params:EmailParams){
  const {
    subject,
    message,
    userEmail,
    headers,
  } = params;

  const response = await fetch(sendEmailEndpoint!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: headers.authorization,
    },
    body: JSON.stringify({subject,message,userEmail}),
  });

  return response;
}
