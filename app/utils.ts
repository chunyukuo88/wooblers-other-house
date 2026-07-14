import { getFeatureStatus } from './flags';
import { Folder, getMainPageImages } from '../common/http';

type GetFoldersResult = {
  displayPrivateImages: boolean;
  folders: Folder[];
};

export async function getFolders(searchParam: string): Promise<GetFoldersResult> {
  const displayPrivateImages = await getFeatureStatus(searchParam);
  const unprocessedFolders = await getMainPageImages(displayPrivateImages);
  const sansThumbnails = removeThumbnails(unprocessedFolders);

  return {
    displayPrivateImages,
    folders: sansThumbnails,
  };
}

const removeThumbnails = (folders: Folder[]) => {
  if (!folders) {
    return [];
  }
  return folders.map((folder: Folder, i: number) => {
    const photosSansThumbnail = folder.photos.filter((photo: string) => {
      const isThumbnail = photo.split('.').find((part) => part.includes('thumbnail'));
      return !isThumbnail;
    });
    const captionsSansThumbnail = folder.captions.filter((caption: string) => {
      const isThumbnailCaption = caption.startsWith('thumbnail');
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
