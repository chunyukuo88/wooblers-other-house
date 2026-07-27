import { ImageGallery } from '@/components/galleries/main-gallery';
import { getFolders } from './utils';
import { Metadata } from 'next';
import { convertAlbumParamToFriendly } from '../store/utils';
import './page.css';

export const dynamic = 'force-dynamic';

type Params = {
  searchParams: Promise<{
    [key: string]: string;
  }>;
};

export default async function Page({ searchParams }: Params) {
  const params = await searchParams;
  const privateImageQuery = params[process.env.NEXT_PUBLIC_FF_PRIVATE_IMAGES_KEY!];
  const { displayPrivateImages, folders } = await getFolders(privateImageQuery);

  if (!folders.length) {
    return (
      <div id="woh__site-down-for-maintenance">
        The site is down for maintenance 🍵
        <br />
        Come back tomorrow!
      </div>
    );
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
