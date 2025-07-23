import { InputField } from '@/components';
import { PropsType } from './types';

const InfoField: React.FC<PropsType> = ({
  info,
  editable,
  editing,
  setEditing,
  editInputs,
}) => {
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label>{info.label}</label>

        <div className='flex gap-4 items-center'>
          <input
            type={info.type}
            className='w-132 rounded-md text-black text-xl'
            value={info.value}
            disabled
          />

          {editable && (
            <button
              type='button'
              className='btn btn-ghost font-normal text-xl'
              onClick={() => {
                setEditing((prev) => !prev);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {editing && <div>{editInputs.map((input) => {})}</div>}
    </div>
  );
};

export default InfoField;
