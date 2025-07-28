import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CameraIcon, HouseIcon } from '@/components';
import { cn } from '@/helpers';
import { useAuth } from '@/hooks';

const Sidebar = () => {
  const { isLoading, user } = useAuth();
  const pathName = usePathname();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='fixed top-22 h-full flex flex-col gap-10 md:px-17.5 md:pt-8'>
      <div className='flex gap-6'>
        <img
          src={user?.avatar_url}
          alt='avatar'
          className='size-15 object-contain bg-gray-300 rounded-full'
        />

        <Link href='/profile'>
          <p className='text-2xl'>{user?.name}</p>
          <p>Edit your profile</p>
        </Link>
      </div>

      <Link href='/news' className='flex items-center gap-11 pl-2'>
        <HouseIcon className={cn({ 'text-red-500': pathName === '/news' })} />
        <span className='text-2xl'>News feed</span>
      </Link>

      <Link href='/movies' className='flex items-center gap-11 pl-2'>
        <CameraIcon
          className={cn({ 'text-red-500': pathName === '/movies' })}
        />
        <span className='text-2xl'>List of movies</span>
      </Link>
    </div>
  );
};

export default Sidebar;
