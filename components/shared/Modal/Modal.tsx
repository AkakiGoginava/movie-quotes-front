import React from 'react';

import { FieldValues } from 'react-hook-form';

import { cn } from '@/helpers';
import { Button } from '@/components';

import { PropsType } from './types';

const Modal = <FormValues extends FieldValues>({
  modalClassName,
  hasButton,
  buttonClassName,
  buttonVariant,
  buttonText,
  open,
  setOpen,
  reset,
  hasExit = true,
  children,
}: PropsType<FormValues>) => {
  return (
    <>
      {hasButton && (
        <Button
          type='button'
          variant={buttonVariant}
          handleClick={() => setOpen(true)}
          className={buttonClassName}
        >
          {buttonText}
        </Button>
      )}

      <dialog className='modal' open={open}>
        <div
          className={cn(
            'modal-box max-w-full size-full md:size-auto px-8.5 md:px-20 pt-12 pb-0 bg-primary',
            modalClassName,
          )}
        >
          {hasExit && (
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={() => {
                reset?.();
                setOpen(false);
              }}
            >
              ✕
            </button>
          )}
          {children}
        </div>

        <div className='modal-backdrop'>
          {hasExit && (
            <button
              onClick={() => {
                reset?.();
                setOpen(false);
              }}
            >
              close
            </button>
          )}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
