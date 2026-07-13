import { getFeatureStatus } from './flags';
import { Folder, getMainPageImages } from '../common/http';
import { logger } from '../common/logging';

type GetFoldersResult = {
  displayPrivateImages: boolean;
  folders: Folder[];
};

export async function getFolders(searchParam: string): Promise<GetFoldersResult> {
  logger('getFolders() 0');
  const displayPrivateImages = await getFeatureStatus(searchParam);
  logger('getFolders() 1');
  const unprocessedFolders = await getMainPageImages(displayPrivateImages);
  logger('getFolders() 2');
  const sansThumbnails = removeThumbnails(unprocessedFolders);
  logger('getFolders() 3');

  return {
    displayPrivateImages,
    folders: sansThumbnails,
  };
}

const removeThumbnails = (folders: Folder[]) => {
  logger('🍎 removeThumbnails 0');
  if (!folders.length) {
    return [];
  }
  logger('🍎 removeThumbnails 1');
  return folders.map((folder: Folder, i: number) => {
    logger('🍎 removeThumbnails 2, index: ', i);
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
