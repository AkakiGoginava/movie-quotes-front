import { useState } from 'react';

import { SearchIcon } from '@/components';
import { cn } from '@/helpers';

import { PropsType } from './types';

const Search: React.FC<PropsType> = ({
  onSearch,
  placeholder = 'Search... (Press Enter)',
  className = '',
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchInput);
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    onSearch('');
    setShowSearchBar(false);
  };

  return (
    <div
      className={cn(
        'hidden md:flex gap-4 items-center ml-auto',
        {
          'border-b border-gray-500 flex-1': showSearchBar,
        },
        className,
      )}
    >
      <div
        onClick={() => (showSearchBar ? clearSearch() : setShowSearchBar(true))}
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
  );
};

export default Search;
