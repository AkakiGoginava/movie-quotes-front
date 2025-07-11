import React from 'react';

import { FieldValues } from 'react-hook-form';

import { Button } from '@/components';

import { PropsType } from './types';

const Modal = <FormValues extends FieldValues>({
  className,
  buttonVariant,
  buttonText,
  open,
  setOpen,
  id,
  reset,
  children,
}: PropsType<FormValues>) => {
  return (
    <>
      <Button
        type='button'
        variant={buttonVariant}
        handleClick={() => setOpen(true)}
        className={className}
      >
        {buttonText}
      </Button>

      <dialog id={id} className='modal' open={open}>
        <div className='modal-box max-w-full size-full md:size-auto px-8.5 md:px-30 pt-12 pb-0 bg-primary'>
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={() => {
              reset();
              setOpen(false);
            }}
          >
            ✕
          </button>

          {children}
        </div>

        <div className='modal-backdrop'>
          <button
            onClick={() => {
              reset();
              setOpen(false);
            }}
          >
            close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
