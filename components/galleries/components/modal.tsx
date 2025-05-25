import {Session} from "next-auth";
import OrderModal from "@/components/galleries/bread-gallery/order-modal";


const Modal = ({showModal, caption, session, closeModal}: ModalProps) => {
  if (!showModal) return null;

  return (
    <OrderModal
      breadType={caption!}
      closeModal={closeModal}
      session={session}
      // @ts-ignore
      userEmail={session?.user.email}
    />
  );
}

type ModalProps = {
  caption: string;
  closeModal: () => void;
  session: Session | null;
  showModal: boolean;
}

export default Modal;