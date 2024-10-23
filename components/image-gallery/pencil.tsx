import {useState} from "react";

function Modal() {
  return (
    <div data-testid="pencil-triggered-modal">
      yay
    </div>
  );
}

export default function Pencil() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const openModal = () => setModalIsVisible(true);
  const closeModal = () => setModalIsVisible(false);

  return (
    <>
      <button
        data-testid="pencil-button"
        onClick={openModal}
      >
        ✏
      </button>
      {modalIsVisible
        ? <Modal />
        : null
      }
    </>
  );
}
