import i18n from '@/src/i18n';

import { CaretIcon } from '@/components/icons';

const languageOptions = [
  { label: 'Eng', value: 'en' },
  { label: 'Geo', value: 'ka' },
];

const LanguageDropdown: React.FC = () => {
  const selectedLangIndex = languageOptions.findIndex(
    (opt) => opt.value === i18n.language,
  );

  return (
    <div className='dropdown'>
      <div
        tabIndex={0}
        role='button'
        className='btn bg-transparent border-none h-8 shadow-none'
      >
        <span>
          {selectedLangIndex >= 0
            ? languageOptions[selectedLangIndex].label
            : ''}
        </span>
        <CaretIcon className='size-4' />
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-obsidian rounded-box z-1 p-2 shadow-sm'
      >
        {languageOptions.map((option, idx) => (
          <li key={idx}>
            <a
              onClick={() => {
                i18n.changeLanguage(option.value);
              }}
              style={{ cursor: 'pointer' }}
            >
              {option.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
