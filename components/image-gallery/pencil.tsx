import {useState} from "react";

type ModalProps = {
  caption: string;
}

function Modal(props: ModalProps) {
  return (
    <div data-testid="pencil-triggered-modal">
      Original caption: {props.caption}
    </div>
  );
}

type PencilProps = {
  caption: string;
  index: number;
}

export default function Pencil(props: PencilProps) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const {caption} = props;
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
        ? <Modal caption={caption}/>
        : null
      }
    </>
  );
}
