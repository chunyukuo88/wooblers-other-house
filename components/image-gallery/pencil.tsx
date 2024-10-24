"use client";
import {useRef, useState} from "react";
import {updateWithNewCaption} from "@/components/image-gallery/utils";
import {createHttpRequest, putData} from "../../common/http";
import {useSession} from "next-auth/react";

type PencilProps = {
  captions: string[];
  index: number;
}

export default function Pencil({captions, index}: PencilProps) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const {data: session} = useSession();
  const inputRef = useRef(null);
  const openModal = () => setModalIsVisible(true);
  const closeModal = () => setModalIsVisible(false);

  const confirmationHandler = async () => {
    const captionsClone = [...captions];
    try {
      // @ts-ignore
      const newCaption = inputRef.current.value
      const updatedCaptions = updateWithNewCaption(captionsClone, newCaption, index);
      // @ts-ignore
      const httpRequest = createHttpRequest("PUT", session.idToken, updatedCaptions);
      const url = process.env.NEXT_PUBLIC_PUT_DATA;
      await putData(url, httpRequest);
    } catch (error) {
      console.error(error);
      alert(`Failed to update caption: ${error.message}`);
    }
    closeModal();
  };

  const cancellationHandler = () => closeModal();

  function Modal() {
    return (
      <div className="woh__pencil-triggered-modal">
        <div>New caption:</div>
        <textarea ref={inputRef} />
        <button
          onClick={confirmationHandler}
        >
          Confirm
        </button>
        <button
          className="woh__modal-cancel-button"
          onClick={cancellationHandler}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        data-testid="pencil-button"
        onClick={openModal}
      >
        ✏
      </button>
      {modalIsVisible
        ? <Modal/>
        : null
      }
    </>
  );
}
