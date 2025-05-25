"use client";
import React, {useState} from "react";
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="woh__modal-overlay" onClick={handleOverlayClick}>
      <div className="woh__order-modal">
        <div className="woh__order-title">Order: {displayTitle}</div>
        <div>Confirm to send your order to the Bread Monster. He'll get in touch with you soon.</div>
        <div className="woh__order-bread-buttons">
          <button onClick={submitHandler}>Submit</button>
          {/*@ts-ignore*/}
          <button onClick={closeModal}>Cancel</button>
        </div>
        {showError ? <div>Ordering system may be down for maintenance.</div> : null}
      </div>
    </div>
  );
}
