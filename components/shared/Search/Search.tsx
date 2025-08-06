import { useState } from 'react';

import { ReturnArrowIcon, SearchIcon } from '@/components';
import { cn } from '@/helpers';

import { PropsType } from './types';

const Search: React.FC<PropsType> = ({
  onSearch,
  placeholder = 'Search',
  className = '',
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

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

  return (
    <div
      className={cn(
        'ml-auto',
        { 'border-b border-gray-500 flex-1': showSearchBar },
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
            className='px-3 py-1.5 border border-transparent bg-transparent text-white rounded-lg focus:outline-none focus:ring-0'
            autoFocus
          />
        ) : (
          <span
            onClick={() => setShowSearchBar(true)}
            className='cursor-pointer hover:text-gray-600 transition-colors'
          >
            Search
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
        </div>
      )}
    </div>
  );
};

export default Search;
