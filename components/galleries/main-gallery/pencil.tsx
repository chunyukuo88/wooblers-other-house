'use client';
import { useRef, useState } from 'react';
import { createNewCaptions } from '@/components/galleries/main-gallery/utils';
import { createHttpRequest, putData } from '../../../common/http';
import { useSession } from 'next-auth/react';

type PencilProps = {
  captions: string[];
  index: number;
  photosLength: number;
};

export function Pencil(props: PencilProps) {
  const { captions, index, photosLength } = props;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { data: session } = useSession();
  const inputRef = useRef(null);

  const openModal = () => setModalIsVisible(true);
  const closeModal = () => setModalIsVisible(false);

  const confirmationHandler = async () => {
    const captionsClone = [...captions];
    try {
      if (!inputRef || inputRef.current === null) {
        return;
      }
      const newCaption = inputRef.current.value;
      const updatedCaptions = createNewCaptions(captionsClone, newCaption, index, photosLength);
      console.dir('updatedCaptions');
      console.dir(updatedCaptions);
      const httpRequest = createHttpRequest('PUT', session.idToken, updatedCaptions);
      console.dir('httpRequest');
      console.dir(httpRequest);
      const url = process.env.NEXT_PUBLIC_PUT_DATA!;

      await putData(url, httpRequest);
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  const cancellationHandler = () => closeModal();

  function Modal() {
    return (
      <div className="woh__pencil-triggered-modal">
        <div>New caption:</div>
        <textarea ref={inputRef} />
        <button onClick={confirmationHandler}>Confirm</button>
        <button className="woh__modal-cancel-button" onClick={cancellationHandler}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <>
      <button data-testid="pencil-button" onClick={openModal}>
        ✏
      </button>
      {modalIsVisible ? <Modal /> : null}
    </>
  );
}
