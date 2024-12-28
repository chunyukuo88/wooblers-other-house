"use client";
import {BucketItem} from "../../store/types";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {useState} from "react";
import OrderModal from "./bread-gallery/order-modal";

export type ImageCardProps = {
  file: BucketItem;
  index: number;
  caption?: string;
  layoutType?: string;
  hasShoppingCart?: boolean;
};

export function processRawCaption(rawCaption: string):string {
  const delimiter = "@";
  return (rawCaption.split("").find(char => char === delimiter))
    ? rawCaption.split("@")[1]
    : rawCaption;
}

export function ImageCard(props: ImageCardProps) {
  const {data: session} = useSession();
  const {caption, file, index, layoutType} = props;
  const displayCaption = caption ? processRawCaption(caption) : "";
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  }

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

  //@ts-ignore
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
      <div
        data-testid="image-item"
        key={index}
        className={`woh__image-item woh__image-index-${index}`}
      >
        <Image
          src={file.url}
          alt={`Image #${index + 1}`}
          width={300}
          height={200}
          placeholder="blur"
          blurDataURL="/images/image_placeholder.png"
          layout={layoutType || "intrinsic"}
        />
      </div>
      <div className="woh__caption-container">
        {cartIsVisible ? <Cart /> : null}
        {displayCaption ? <div className="woh__caption" data-testid="display-caption">{displayCaption}</div> : null}
      </div>
      {showModal ? <Modal /> : null}
    </>
  );
}
