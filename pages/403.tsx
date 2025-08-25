import { Button } from '@/components';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function ForbiddenPage() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-6 items-center'>
        <img src={`/assets/403-cover.png`} className='w-86.5 h-65' />

        <h1 className='font-bold text-2xl md:text-5xl'>You shall not pass!</h1>

        <p className='font-medium md:text-2xl'>{t('403.description')}</p>

        <Button
          variant='primary'
          type='button'
          handleClick={() => router.push('/')}
          className='text-base md:text-xl'
        >
          {t('403.returnHome')}
        </Button>
      </div>
    </div>
  );
}
