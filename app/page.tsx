import ImageGallery from '@/components/galleries/main-gallery/image-gallery';
import { getFolders } from './utils';
import { Metadata } from 'next';
import { convertAlbumParamToFriendly } from 'store/album/utils';
import { logger } from '../common/logging';

export const dynamic = 'force-dynamic';

type Params = {
  searchParams: Promise<{
    [key: string]: string;
  }>;
};

export default async function Page({ searchParams }: Params) {
  logger('🏠 Homepage() 0');
  const params = await searchParams;
  logger('🏠 Homepage() 1');
  const privateImageQuery = params[process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!];
  logger('🏠 Homepage() 2');
  const { displayPrivateImages, folders } = await getFolders(privateImageQuery);
  logger('🏠 Homepage() 3');
  if (!folders) {
    return <div>The site is down for maintenance. Come back tomorrow!</div>;
  }

  const albumQueryParameter = params['album'];
  const preselectedAlbum = convertAlbumParamToFriendly(albumQueryParameter);

  return (
    <ImageGallery
      folders={folders}
      showPrivateImages={displayPrivateImages}
      preselectedAlbum={preselectedAlbum}
    />
  );
}

export const metadata: Metadata = {
  title: process.env.NODE_ENV === 'production' ? '⚽ Gooooaaal!' : '小巫之另一個屋',
};
