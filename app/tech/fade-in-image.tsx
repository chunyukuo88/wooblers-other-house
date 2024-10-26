import Image from "next/image";

type FadeInImageProps = {
  alt: string;
  fadeInFromThe: "left" | "right";
  height: number;
  isVisible: boolean | null;
  src: string;
  width: number;
}

export default function FadeInImage(props: FadeInImageProps) {
  const {
    alt,
    fadeInFromThe,
    height,
    isVisible,
    src,
    width,
  } = props;
  return (
    <span className={`woh__fade-in-container-${fadeInFromThe}`}>
      <div className={`woh__tech-page-image-${fadeInFromThe} ${isVisible ? "fade-in" : ""}`}>
        <Image
          alt={alt}
          src={src}
          width={width}
          height={height}
        />
      </div>
    </span>
  );
};
