import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, ReturnArrowIcon, ValidationList } from '@/components';

import { PropsType } from './types';
import useInfoField from './useInfoField';

const InfoField = <FormValues extends FieldValues = FieldValues>({
  name,
  info,
  editable,
  editing,
  setEditing,
  editInputs,
  register,
  getValues,
  errors,
  touchedFields,
}: PropsType<FormValues>) => {
  const { promptOpen, setPromptOpen, isMobile } = useInfoField();

  const { t } = useTranslation();

  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label>{info.label}</label>

        <div className='flex gap-4 items-center md:justify-normal w-full md:w-auto border-b border-gray-500 pb-2 md:border-none md:pb-0'>
          <input
            type={info.type}
            className='w-50 text-nowrap overflow-ellipsis md:w-132 rounded-md md:text-black text-lg md:text-xl pl-0 md:pl-2 bg-transparent md:bg-white border-none md-border'
            value={info.value}
            disabled
          />

          {editable && (
            <button
              type='button'
              className='btn btn-ghost ml-auto font-normal text-lg md:text-xl'
              onClick={() => {
                setEditing((prev) => !prev);
              }}
            >
              {t('infoField.edit')}
            </button>
          )}
        </div>
      </div>

      {editing && !isMobile && (
        <ValidationList
          name={name}
          editInputs={editInputs}
          getValues={getValues}
          errors={errors}
          register={register}
          touchedFields={touchedFields}
        />
      )}

      {isMobile && (
        <>
          {editing && (
            <dialog className='modal mt-22' open={editing}>
              <div className='modal-box max-w-full size-full py-0 px-0 bg-primary'>
                <ReturnArrowIcon
                  className='ml-6 my-4'
                  onClick={() => {
                    setEditing(false);
                  }}
                />

                <ValidationList
                  name={name}
                  editInputs={editInputs}
                  getValues={getValues}
                  errors={errors}
                  register={register}
                  touchedFields={touchedFields}
                />

                <div className='flex justify-between pt-7 px-8'>
                  <Button
                    className='bg-transparent'
                    type='button'
                    handleClick={() => {
                      setEditing(false);
                    }}
                  >
                    {t('infoField.cancel')}
                  </Button>

                  <Button
                    className='h-9.5'
                    variant='primary'
                    type='button'
                    handleClick={() => {
                      setPromptOpen(true);
                    }}
                  >
                    {t('infoField.edit')}
                  </Button>
                </div>
              </div>
            </dialog>
          )}

          <dialog className='modal' open={promptOpen}>
            <div className='modal-box bg-obsidian p-0'>
              <p className='text-center border-b border-gray-600 pb-10 pt-16'>
                {t('infoField.prompt')}
              </p>

              <div className='flex justify-between py-6 px-4'>
                <Button
                  className='bg-transparent'
                  type='button'
                  handleClick={() => {
                    setPromptOpen(false);
                  }}
                >
                  {t('infoField.cancel')}
                </Button>

                <Button
                  className='h-9.5'
                  variant='primary'
                  type='submit'
                  handleClick={() => {
                    setPromptOpen(false);
                  }}
                >
                  {t('infoField.confirm')}
                </Button>
              </div>
            </div>

            <div className='modal-backdrop backdrop-blur-xs'>
              <button
                onClick={() => {
                  setPromptOpen(false);
                }}
              >
                {t('infoField.close')}
              </button>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
};

export default InfoField;
