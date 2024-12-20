"use client";
import {useState} from "react";
import {sendEmail, SendEmailParams} from "./utils";
import {errorLogger} from "../../../common/logging";
import "./order-modal.css";

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
    <div className="woh__order-bread-panel">
        <h3>Order: {displayTitle}</h3>
        <div>Press "Submit" to send an email to the Bread Monster. He will reach out to you once he gets it.</div>
        <div className="woh__order-bread-buttons">
          <button onClick={submitHandler}>Submit</button>
          {/*@ts-ignore*/}
          <button onClick={closeModal}>Cancel</button>
        </div>
        {showError ? <div>Ordering system may be down for maintenance.</div> : null}
    </div>
  );
}
