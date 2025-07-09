import React from 'react';

import { PropsType } from './types';

const Modal: React.FC<PropsType> = ({ className, buttonText, id }) => {
  return (
    <>
      <button
        type='button'
        onClick={() => document.getElementById(id)?.showModal()}
        className={className}
      >
        {buttonText}
      </button>

      <dialog id={id} className='modal'>
        <div className='modal-box size-full md:size-auto px-8.5 md:px-30 py-13 bg-primary'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>

          <h3 className='font-bold text-lg'>Hello!</h3>
          <p className='py-4'>Press ESC key or click on ✕ button to close</p>
        </div>

        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
