"use client";
import {useState} from "react";
import {sendEmail, SendEmailParams} from "./utils";
import {errorLogger} from "../../../common/logging";

export type OrderModalProps = SendEmailParams & {
  closeModal: Function;
}
export default function OrderModal(props: OrderModalProps) {
  const [showError, setShowError] = useState(false);
  const {closeModal, breadType} = props;
  const displayTitle = breadType.charAt(0).toUpperCase() + breadType.slice(1);
  const submitHandler = async () => {
    try {
      await sendEmail(props);
      closeModal();
    } catch (e) {
      setShowError(true);
      errorLogger(`Email failed: ${e}`);
    }
  };

  return (
    <div className="woh__order-bread-modal">
      <h1>Order: {displayTitle}</h1>
      <button onClick={submitHandler}>Submit</button>
      <button onClick={closeModal}>Cancel</button>
      {showError ? <div>Ordering system may be down for maintenance.</div> : null}
    </div>
  );
}
