import React from 'react';

import { PropsType } from './types';

const Modal: React.FC<PropsType> = ({
  className,
  buttonText,
  id,
  children,
}) => {
  return (
    <>
      <button
        type='button'
        onClick={() =>
          (document.getElementById(id) as HTMLDialogElement)?.showModal()
        }
        className={className}
      >
        {buttonText}
      </button>

      <dialog id={id} className='modal'>
        <div className='modal-box max-w-full size-full md:size-auto px-8.5 md:px-30 pt-12 pb-0 bg-primary'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>

          {children}
        </div>

        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
