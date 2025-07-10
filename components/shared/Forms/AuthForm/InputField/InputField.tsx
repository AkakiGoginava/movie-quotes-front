import { FieldValues } from 'react-hook-form';
import { PropsType } from './types';

const InputField = <FormValues extends FieldValues>({
  input,
  errors,
  register,
}: PropsType<FormValues>) => {
  return (
    <div className='relative flex flex-col gap-1' key={input.name}>
      <label className='text-white' htmlFor={input.name}>
        {input.label}
      </label>

      <input
        id={input.name}
        type={input.type}
        className='text-black bg-gray-300 outline-none rounded-sm w-90 h-9.5 px-2 focus:ring-4 focus:ring-gray-500'
        placeholder={input.placeholder}
        {...register(input.name, input?.rules)}
      />

      <p className='absolute -bottom-6 text-red-500 text-sm'>
        {(errors?.[input.name] as { message?: string })?.message}
      </p>
    </div>
  );
};

export default InputField;
