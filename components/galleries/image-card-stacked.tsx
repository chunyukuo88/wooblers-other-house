import {useState} from "react";
import {calculateStyle} from "@/components/galleries/utils";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {StackedCardProps} from "@/components/galleries/types";
import Cart from "@/components/galleries/cart";
import Modal from "@/components/galleries/modal";

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
