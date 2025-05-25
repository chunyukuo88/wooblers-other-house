import {Dispatch, SetStateAction} from "react";
import Image from "next/image";

const Cart = ({cartIsVisible, showModal, setShowModal}: CartProps) => {
  if (!cartIsVisible) return null;

  const cartClickHandler = () => showModal
    ? setShowModal(false)
    : setShowModal(true);

  return (
    <div className="woh__order-bread-button" onClick={cartClickHandler} role="button">
      <Image
        src="/images/cart.png"
        alt="shopping cart"
        width={50}
        height={50}
      />
    </div>
  );
}

type CartProps = {
  cartIsVisible: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>
  showModal: boolean;
}

export default Cart;