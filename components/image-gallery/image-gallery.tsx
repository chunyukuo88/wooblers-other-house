"use client"
import React, {useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {errorLogger, getImages, queryKeys} from "../../common/http";
import {useSession} from "next-auth/react";
import {FetchedImagesContext as context} from "../../store/fetched-images-context"
import ScrollToTopButton from "@/components/navigation/scroll-to-top-button";
import {ImageCard} from "@/components/image-gallery/image-card";
import {BucketItem} from "../../store/types";
import Pencil from "@/components/image-gallery/pencil";
import "./image-gallery.css";

const ImageGallery: React.FC = () => {
  const {
    updateFetchedImages,
    fetchedImageObjects,
    updateFetchedCaptions,
    fetchedCaptionStrings,
  } = useContext(context);
  const {data: session} = useSession();
  const queryResult = useQuery({
    queryKey: [queryKeys.GET_IMAGES],
    queryFn: getImages,
    refetchOnMount: false,
  });

  if (queryResult.error) return <div>Failed to get images.</div>;
  if (queryResult.isLoading) return <div>Loading...</div>;
  if (queryResult.isSuccess) {
    try {
      updateFetchedImages(queryResult.data.photos);
      updateFetchedCaptions(queryResult.data.captions);
    } catch (e) {
      errorLogger("Error parsing images: ", e);
    }
  }

  const WrappedButton = () => (
    <div style={{height: "0px"}} className="woh__scroll-to-top-trigger">
      <ScrollToTopButton/>
    </div>
  );

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {fetchedImageObjects.map((file: BucketItem, index: number) => {
          const caption = fetchedCaptionStrings[index];
          return (
            <div className={`woh__image-${index}`} key={index}>
              <ImageCard file={file} index={index} caption={caption}/>
              {session ? <Pencil captions={fetchedCaptionStrings} index={index} /> : null}
            </div>
          );
        })}
      </div>
      {(fetchedImageObjects.length > 0) ? <WrappedButton /> : null}
    </div>
  );
};

export default ImageGallery;