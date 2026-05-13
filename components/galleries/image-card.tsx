"use client";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {GALLERY_BUCKETS, SingleCardProps} from "@/components/galleries/types";
import Modal from "@/components/galleries/components/modal";
import Cart from "@/components/galleries/components/cart";

const CLOUDFRONT = 'https://d3lmusesbs23gp.cloudfront.net';

export function ImageCard(props: SingleCardProps) {
    const {data: session} = useSession();
    const {caption, file, galleryPrefix, index} = props;
    const displayCaption = caption ? processRawCaption(caption) : "";
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    //@ts-ignore
    const cartIsVisible = (session?.accessToken && session?.idToken);

    const imageUrl = getImageUrl(galleryPrefix, file);
    const srcSet = getSrcSet(galleryPrefix, file);

    const transparent = (galleryPrefix === GALLERY_BUCKETS.BREAD) ? 'transparent' : '';
    return (
        <>
            <div
                data-testid="image-item"
                key={index}
                className={`woh__image-item ${transparent} woh__image-index-${index}`}
            >
                <img
                    src={imageUrl}
                    srcSet={srcSet}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    alt={`Image #${index + 1}`}
                    width={300}
                    height={200}
                    style={responsive}
                />
                {displayCaption ? <div className="woh__caption" data-testid="display-caption">{displayCaption}</div> : null}
            </div>
            <Cart cartIsVisible={cartIsVisible} showModal={showModal} setShowModal={setShowModal}/>
            <Modal showModal={showModal} caption={caption} session={session} closeModal={closeModal}/>
        </>
    );
}

const responsive = { width: "100%", height: "auto" };

const getImageKey = (galleryPrefix: string, file: string | { key: string }): string => {
    const isMainGallery = (galleryPrefix === GALLERY_BUCKETS.MAIN_PRIVATE || galleryPrefix === GALLERY_BUCKETS.MAIN_PUBLIC);
    //@ts-ignore
    const fullUrl = isMainGallery ? `${galleryPrefix}${file}` : `${galleryPrefix}${file.key}`;

    // Strip the S3 domain, leaving just the key e.g. "1753562439640/b.jpg"
    const s3UrlPattern = /https:\/\/[^/]+\.s3[^/]*\.amazonaws\.com\//;
    return fullUrl.replace(s3UrlPattern, '');
};

const getImageUrl = (galleryPrefix: string, file: string | { key: string }): string => {
    return `${CLOUDFRONT}/${getImageKey(galleryPrefix, file)}?w=800`;
};

const getSrcSet = (galleryPrefix: string, file: string | { key: string }): string => {
    const key = getImageKey(galleryPrefix, file);
    return [
        `${CLOUDFRONT}/${key}?w=800 800w`,
        `${CLOUDFRONT}/${key}?w=1600 1600w`,
        `${CLOUDFRONT}/${key}?w=3200 3200w`,
    ].join(', ');
};

export function processRawCaption(rawCaption: string): string {
    const delimiter = "@";
    return (rawCaption.split("").find(char => char === delimiter))
        ? rawCaption.split("@")[1]
        : rawCaption;
}