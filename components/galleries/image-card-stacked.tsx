import {useState} from "react";
import {calculateStyle} from "@/components/galleries/utils";
import {BucketItem} from "../../store/types";
import Image from "next/image";
import {useSession} from "next-auth/react";
import OrderModal from "@/components/galleries/bread-gallery/order-modal";

type StackedCardProps = {
  bucketItems: BucketItem[],
  index: number,
  caption: string,
}

export default function ImageCardStacked(props: StackedCardProps) {
  const {data: session} = useSession();
  const {bucketItems, caption, index} = props;
  const defaultActiveIndex = bucketItems.length - 1;
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActiveIndex);
  const [showModal, setShowModal] = useState(false);

  const cartClickHandler = () => showModal
    ? setShowModal(false)
    : setShowModal(true);

  const Cart = () => (
    <div className="woh__order-bread-button" onClick={cartClickHandler} role="button">
      <Image
        src="/images/cart.png"
        alt="shopping cart"
        width={50}
        height={50}
      />
    </div>
  );

  const clickHandler = (index: number) => {
    setActiveIndex((prevIndex) => {
      return (prevIndex === index) ? 0 : index
    });
  };

  const indexDecrementer = () => (activeIndex === 0)
    ? setActiveIndex(bucketItems.length - 1)
    // @ts-ignore
    : setActiveIndex(activeIndex - 1);

  const closeModal = () => {
    setShowModal(false);
  }

  const cartIsVisible = (session?.accessToken && session?.idToken);
  const Modal = () => (
    <OrderModal
      breadType={caption!}
      session={session}
      closeModal={closeModal}
      // @ts-ignore
      userEmail={session?.user.email}
    />
  );

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
        {cartIsVisible ? <Cart /> : null}
        {showModal ? <Modal /> : null}
      </div>
    </>
  )
};
