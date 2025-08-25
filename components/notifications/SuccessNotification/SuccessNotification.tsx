import { useTranslation } from 'react-i18next';

import { NotificationLayout, SuccessIcon } from '@/components';

import { PropsType } from './types';

const SuccessNotification: React.FC<PropsType> = ({
  open,
  setOpen,
  setLoginOpen,
}) => {
  const { t } = useTranslation();

  return (
    <NotificationLayout
      open={open}
      setOpen={setOpen}
      icon={<SuccessIcon />}
      title={t('notifications.successTitle')}
      text={t('notifications.successText')}
      hasBtn={true}
      btnText={t('notifications.successBtnText')}
      handleClick={() => {
        setOpen(false);
        setLoginOpen(true);
      }}
    />
  );
};

export default SuccessNotification;
