"use client";
import {useState} from "react";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {GALLERY_BUCKETS, SingleCardProps} from "@/components/galleries/types";
import Modal from "@/components/galleries/components/modal";
import Cart from "@/components/galleries/components/cart";

export function ImageCard(props: SingleCardProps) {
  const {data: session} = useSession();
  const {caption, file, galleryPrefix, index} = props;
  // const displayCaption = caption ? processRawCaption(caption) : ""; // TODO: Revisit in caption ticket.
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  //@ts-ignore
  const cartIsVisible = (session?.accessToken && session?.idToken);

  const responsive = { width: "100%", height: "auto" };

  const imageUrl = (galleryPrefix === GALLERY_BUCKETS.MAIN)
    ? `${galleryPrefix}${file}`
    // @ts-ignore
    : `${galleryPrefix}${file.key}`;

  return (
    <>
      <div
        data-testid="image-item"
        key={index}
        className={`woh__image-item woh__image-index-${index}`} // TODO: use `[class*="woh__image-wrapper-"]` syntax instead of two classes.
      >
        <Image
          src={imageUrl}
          alt={`Image #${index + 1}`}
          width={300}
          height={200}
          placeholder="blur"
          blurDataURL="/images/image_placeholder.png"
          style={responsive}
        />
      </div>
      <Cart cartIsVisible={cartIsVisible} showModal={showModal} setShowModal={setShowModal}/>
      <Modal showModal={showModal} caption={caption} session={session} closeModal={closeModal}/>
    </>
  );
}

export function processRawCaption(rawCaption: string):string {
  const delimiter = "@";
  return (rawCaption.split("").find(char => char === delimiter))
    ? rawCaption.split("@")[1]
    : rawCaption;
}
