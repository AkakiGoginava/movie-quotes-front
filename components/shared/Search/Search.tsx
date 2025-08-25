import { useState } from 'react';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

import { ReturnArrowIcon, SearchIcon } from '@/components';
import { cn } from '@/helpers';

import { PropsType } from './types';

const Search: React.FC<PropsType> = ({
  onSearch,
  placeholder = 'Search',
  className = '',
}) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const isNewsPage = router.pathname === '/news';

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchInput);
      setShowMobileModal(false);
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    onSearch('');
    setShowSearchBar(false);
    setShowMobileModal(false);
  };

  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'ml-auto',
        { 'border-b border-gray-500 flex-[999]': showSearchBar },
        className,
      )}
    >
      <div className={cn('hidden md:flex gap-4 items-center ml-auto')}>
        <div
          onClick={() =>
            showSearchBar ? clearSearch() : setShowSearchBar(true)
          }
          className='cursor-pointer'
        >
          <SearchIcon />
        </div>

        {showSearchBar ? (
          <input
            type='text'
            placeholder={placeholder}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            className='px-3 py-1.5 border border-transparent bg-transparent text-white rounded-lg focus:outline-none focus:ring-0 w-full'
            autoFocus
          />
        ) : (
          <span
            onClick={() => setShowSearchBar(true)}
            className='cursor-pointer hover:text-gray-600 transition-colors'
          >
            {t('search.search')}
          </span>
        )}
      </div>

      <div
        onClick={() => {
          setShowMobileModal(true);
        }}
        className='cursor-pointer md:hidden'
      >
        <SearchIcon />
      </div>

      {showMobileModal && (
        <div className='fixed inset-0 bg-black z-50 md:hidden'>
          <div className='flex items-start justify-between p-4 border-b border-gray-700'>
            <div className='flex items-center gap-4 flex-1'>
              <ReturnArrowIcon
                onClick={() => {
                  setShowMobileModal(false);
                }}
              />

              <input
                type='text'
                placeholder={placeholder}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
                className='flex-1 px-1 py-2 placeholder:text-white bg-transparent text-white border-none focus:outline-none focus:ring-0 text-lg'
                autoFocus
              />
            </div>
          </div>

          {isNewsPage && (
            <div className='text-gray-500'>
              <p className='px-16 pt-8'>
                {t('search.enter')} <span className='text-white'>@</span>{' '}
                {t('search.enterAt')}
              </p>
              <p className='px-16 pt-8'>
                {t('search.enter')} <span className='text-white'>#</span>{' '}
                {t('search.enterHash')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
