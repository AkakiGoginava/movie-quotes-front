import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { Button, CameraIcon, HouseIcon } from '@/components';
import { cn } from '@/helpers';
import { useAuth } from '@/hooks';

const Sidebar = () => {
  const { isLoading, user, handleLogout } = useAuth();
  const pathName = usePathname();
  const { t } = useTranslation();

  if (isLoading) return <div>{t('loading')}</div>;

  return (
    <div className='fixed top-22 h-full flex flex-col gap-10 md:px-17.5 md:pt-8'>
      <div className='flex gap-6'>
        <img
          src={user?.avatar_url}
          alt='avatar'
          className={cn('size-15 object-contain bg-gray-300 rounded-full', {
            'outline-1 outline-red-500': pathName === '/profile',
          })}
        />

        <Link href='/profile'>
          <p className='text-2xl'>{user?.name}</p>
          <p>{t('sidebar.editProfile')}</p>
        </Link>
      </div>

      <Link href='/news' className='flex items-center gap-11 pl-2'>
        <HouseIcon className={cn({ 'text-red-500': pathName === '/news' })} />
        <span className='text-2xl'>{t('sidebar.newsFeed')}</span>
      </Link>

      <Link href='/movies' className='flex items-center gap-11 pl-2'>
        <CameraIcon
          className={cn('size-8', { 'text-red-500': pathName === '/movies' })}
        />
        <span className='text-2xl'>{t('sidebar.listOfMovies')}</span>
      </Link>

      <Button
        type='button'
        variant='secondary'
        handleClick={() => {
          handleLogout();
        }}
        className='w-fit border-none text-2xl md:hidden pl-0'
      >
        {t('logout')}
      </Button>
    </div>
  );
};

export default Sidebar;
