import Image from "next/image";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {SingleCardProps} from "@/components/galleries/types";
import Modal from "@/components/galleries/components/modal";
import Cart from "@/components/galleries/components/cart";

export function ImageCard(props: SingleCardProps) {
  const {data: session} = useSession();
  const {caption, file, index} = props;
  const displayCaption = caption ? processRawCaption(caption) : "";
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  //@ts-ignore
  const cartIsVisible = (session?.accessToken && session?.idToken);

  const responsive = { width: "100%", height: "auto" };

  const imageUrl = `https://woobler-photos-test.s3.us-east-1.amazonaws.com/${file}`;
  return (
    <>
      <div
        data-testid="image-item"
        key={index}
        className={`woh__image-item woh__image-index-${index}`}
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
      {displayCaption ? <div className="woh__caption" data-testid="display-caption">{displayCaption}</div> : null}
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
