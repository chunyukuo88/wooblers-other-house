import {useRef, useState} from "react";
import {updateWithNewCaption} from "@/components/image-gallery/utils";

type PencilProps = {
  captions: string[];
  index: number;
}

export default function Pencil({captions, index}: PencilProps) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const inputRef = useRef(null);
  const openModal = () => setModalIsVisible(true);
  const closeModal = () => setModalIsVisible(false);

  const confirmationHandler = async () => {
    const captionsClone = [...captions];
    // @ts-ignore
    const newCaption = inputRef.current.value
    const updatedCaptions = updateWithNewCaption(captionsClone, newCaption, index);
    console.dir(updatedCaptions)
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
