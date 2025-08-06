import { CaretIcon } from '@/components/icons';
import { PropsType } from './types';

const Dropdown: React.FC<PropsType> = ({ options, selected }) => {
  return (
    <div className='dropdown'>
      <div
        tabIndex={0}
        role='button'
        className='btn bg-transparent border-none h-8 shadow-none'
      >
        <span>{selected != null ? (options[selected] ?? '') : ''}</span>
        <CaretIcon />
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-obsidian rounded-box z-1 p-2 shadow-sm'
      >
        {options.map((option, idx) => (
          <li key={idx}>
            <a>{option}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
