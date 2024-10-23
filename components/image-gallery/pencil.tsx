import {useState} from "react";

type PencilProps = {
  caption: string;
  index: number;
}

export default function Pencil(props: PencilProps) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const {caption} = props;
  const openModal = () => setModalIsVisible(true);
  const closeModal = () => setModalIsVisible(false);

  function Modal() {
    return (
      <div data-testid="pencil-triggered-modal">
        Original caption: {caption}
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
        ? <Modal caption={caption}/>
        : null
      }
    </>
  );
}
