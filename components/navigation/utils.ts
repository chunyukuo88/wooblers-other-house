import {getFeatureStatus} from "../../app/flags";
import {getMainPageImages, Folder} from "../../common/http";

export async function getFolders(searchParam: string){
  const featureFlag = process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!;
  const displayPrivateImages = await getFeatureStatus(searchParam, featureFlag);
  const unprocessedFolders = await getMainPageImages(displayPrivateImages);
  const sansThumbnails = removeThumbnails(unprocessedFolders);

  return {
    displayPrivateImages,
    folders: sansThumbnails,
  };
}

const removeThumbnails = (folders: Folder[]) => {
  return folders.map((folder: Folder) => {
    const photosSansThumbnail = folder.photos.filter((photo: string) => {
      const isThumbnail = photo.split(".").find(part => part.includes("thumbnail"));
      return !isThumbnail;
    });
    const captionsSansThumbnail = folder.captions.filter((caption: string) => {
      const isThumbnailCaption = caption.startsWith("thumbnail");
      return !isThumbnailCaption;
    });
    return {
      captions: captionsSansThumbnail,
      friendlyName: folder.friendlyName,
      name: folder.name,
      photos: photosSansThumbnail,
    };
  });
};
