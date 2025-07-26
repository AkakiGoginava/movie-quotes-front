import { useAuth } from '@/hooks';
import Link from 'next/link';

const Sidebar = () => {
  const { isLoading, user } = useAuth();

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
    </div>
  );
};

export default Sidebar;
