import {sendEmail, SendEmailParams} from "./utils";

export default function OrderModal(props: SendEmailParams) {
  const submitHandler = () => sendEmail(props);

  return (
    <>
      <button onClick={submitHandler}>Submit</button>
    </>
  )
}
