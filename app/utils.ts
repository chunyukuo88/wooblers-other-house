import { getFeatureStatus } from './flags';
import { getMainPageImages, Folder } from '../common/http';

type GetFoldersResult = {
  displayPrivateImages: boolean;
  folders: Folder[];
};

/**
 *
 * */
export function convertFriendlyToQueryParam(friendlyName: string): string {
  const spacesToHyphens = friendlyName.split(' ').join('-').toLowerCase();
  return spacesToHyphens.replace('!', '%21');
}

/**
 * Contract: The only special char used by album params is exclamation marks.
 * @param searchParam the friendly album name, with URL conversions (such as for special chars)
 * @returns the friendly album name, without URL conversions
 * */
export function convertAlbumParamToFriendly(searchParam: string): string {
  if (!searchParam) {
    return '';
  }
  const hyphensToSpaces = searchParam.split('-').join(' ').toLowerCase();
  return hyphensToSpaces.replace('%21', '!');
}

export async function getFolders(searchParam: string): Promise<GetFoldersResult> {
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
