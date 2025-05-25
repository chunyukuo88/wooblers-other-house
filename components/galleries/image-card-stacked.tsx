import {Dispatch, SetStateAction, useState} from "react";
import {calculateStyle} from "@/components/galleries/utils";
import Image from "next/image";
import {useSession} from "next-auth/react";
import OrderModal from "@/components/galleries/bread-gallery/order-modal";
import {StackedCardProps} from "@/components/galleries/types";
import {Session} from "next-auth";

export default function ImageCardStacked(props: StackedCardProps) {
  const {data: session} = useSession();
  const {bucketItems, caption, index} = props;
  const defaultActiveIndex = bucketItems.length - 1 || 0;
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);
  const [showModal, setShowModal] = useState(false);

  const clickHandler = (index: number) => {
    setActiveIndex((prevIndex) => {
      return (prevIndex === index) ? 0 : index
    });
  };

  const indexDecrementer = () => (activeIndex === 0)
    ? setActiveIndex(bucketItems.length - 1)
    : setActiveIndex(activeIndex - 1);

  const closeModal = () => setShowModal(false);

  //@ts-ignore
  const cartIsVisible = (session && session.accessToken && session.idToken);

  return (
    <>
      <div className="woh__card-fan-frame" key={index}>
        {bucketItems.map((bucketItem, index) => {
          const isActive = (activeIndex === index);
          return (
            <div
              onClick={() => clickHandler(index)}
              style={{
                ...calculateStyle(bucketItems, index),
                zIndex: isActive ? 100 : 0,
              }}
              key={index}
              className="woh__card-fan-member"
            >
              <img
                src={bucketItem.url}
                alt={`Image #${index + 1}`}
                width={280}
                height={"auto"}
              />
            </div>
          );
        })}
      </div>
      <div className="woh__bread-caption-container">
        <div
          role="button"
          className="woh__bread-stack-button"
          onClick={indexDecrementer}
        >
          <Image
            width={50}
            height={50}
            alt="Bread roll button"
            src="images/button__bread-roll.png"
          />
        </div>
        <div className="woh__bread-stack-caption">{caption}</div>
        <Cart cartIsVisible={cartIsVisible} showModal={showModal} setShowModal={setShowModal}/>
        <Modal showModal={showModal} caption={caption} session={session} closeModal={closeModal}/>
      </div>
    </>
  )
};

type ModalProps = {
  caption: string;
  closeModal: () => void;
  session: Session | null;
  showModal: boolean;
}

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

type CartProps = {
  cartIsVisible: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>
  showModal: boolean;
}

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
