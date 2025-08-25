import { Button } from '@/components';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function Error404() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-6 items-center'>
        <img src={`/assets/404-cover.png`} className='w-30.5 h-44.5' />

        <h1 className='font-bold text-2xl md:text-5xl'>Whoops!</h1>

        <p className='font-medium md:text-2xl'>{t('404.description')}</p>

        <Button
          variant='primary'
          type='button'
          handleClick={() => router.push('/')}
          className='text-base md:text-xl'
        >
          {t('404.returnHome')}
        </Button>
      </div>
    </div>
  );
}
