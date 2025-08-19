import { EditQuote, ViewQuote, Modal } from '@/components';
import { useMovie } from '@/hooks';
import { PropsType } from './types';

const NotificationQuoteView: React.FC<PropsType> = ({
  notification,
  setOpenQuoteEdit,
  openQuoteEdit,
  setOpenQuoteView,
  openQuoteView,
}) => {
  const { handleDeleteQuoteFactory } = useMovie();

  const handleDeleteQuote = handleDeleteQuoteFactory(
    notification.quote.movie_id,
  );

  return (
    <>
      <EditQuote
        setModalOpen={setOpenQuoteEdit}
        modalOpen={openQuoteEdit}
        quote={notification.quote}
      />

      <Modal
        setOpen={setOpenQuoteView}
        open={openQuoteView}
        modalClassName='px-9 md:px-8 md:w-[45vw]'
      >
        <ViewQuote
          setModalOpen={setOpenQuoteView}
          quote={notification.quote}
          setOpenQuoteEdit={setOpenQuoteEdit}
          handleDeleteQuote={handleDeleteQuote}
        />
      </Modal>
    </>
  );
};

export default NotificationQuoteView;
