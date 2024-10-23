import {useRef, useState} from "react";

type PencilProps = {
  captions: string[];
  index: number;
}

export default function Pencil({captions, index}: PencilProps) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const inputRef = useRef(null);
  // const originalCaption = captions[index].split("@")[1];
  const originalCaption = captions[index];
  const openModal = () => setModalIsVisible(true);
  const closeModal = () => setModalIsVisible(false);

  const confirmationHandler = () => {
    // @ts-ignore
    const newText = inputRef.current.value;
    console.log(`newText: ${newText}`);
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
