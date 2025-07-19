"use client"
import React, {useContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getMainPageImages, queryKeys} from "../../../common/http";
import {useSession} from "next-auth/react";
import {FetchedImagesContextV2 as context} from "../../../store/fetched-images-context-v2"
import ScrollToTopButton from "@/components/navigation/scroll-to-top-button";
import {ImageCard} from "@/components/galleries/image-card";
import {BucketItem, Folder} from "../../../store/types";
import Pencil from "@/components/galleries/main-gallery/pencil";
import "../styles.css";
import {errorLogger} from "../../../common/logging";

const ImageGallery: React.FC = () => {
  const {
    fetchedFolders,
    updateFetchedFolders
  } = useContext(context);
  // const {data: session} = useSession();

  const queryResult = useQuery({
    queryKey: [queryKeys.GET_MAIN_PAGE_IMAGES],
    queryFn: getMainPageImages,
    refetchOnMount: false,
  });
  if (queryResult.error) return <div>Failed to get images.</div>;
  if (queryResult.isLoading) return <div>Loading...</div>;
  // if (queryResult.isSuccess) {
  //   try {
  //     updateFetchedFolders(queryResult.data);
  //   } catch (e) {
  //     errorLogger("Error parsing folders: ", e);
  //   }
  // }


  const firstFolder = queryResult.data[0];

  const WrappedButton = () => (
    <div style={{height: "0px"}} className="woh__scroll-to-top-trigger">
      <ScrollToTopButton/>
    </div>
  );
  console.log('queryResult.data')
  console.dir(queryResult.data);

  return (
    <div className="woh__image-gallery">
      <div className="woh__image-grid">
        {firstFolder.photos.map((file: string, index: number) => {
          const caption = firstFolder.captions[index];
          return (
            <div className={`woh__image-wrapper-${index}`} key={index}>
              <ImageCard
                file={file}
                index={index}
                caption={caption}
              />
              {/*{session ? <Pencil captions={fetchedCaptionStrings} index={index} /> : null}*/}
            </div>
          );
        })}
      </div>
      {/*{(folders[0].photos.length > 0) ? <WrappedButton /> : null}*/}
    </div>
  );
};

export default ImageGallery;