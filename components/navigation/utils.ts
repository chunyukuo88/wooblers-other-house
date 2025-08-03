import {cookies} from "next/headers";
import {getFlagsFromParams} from "../../app/flags";
import {getMainPageImages} from "../../common/http";

export async function getFolders(searchParam: string){
  const cookieStore = await cookies();
  const enabledHowzitFromCookies = cookieStore.get('howzit')?.value === 'true';

  const {showPrivateImages: enableHowzitFromQueryParams} = getFlagsFromParams(searchParam);
  const displayPrivateImages = enableHowzitFromQueryParams || enabledHowzitFromCookies;
  return {
    displayPrivateImages,
    folders: await getMainPageImages(displayPrivateImages)
  };
}
