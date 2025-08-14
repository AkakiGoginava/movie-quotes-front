import { Layout, PencilIcon, SearchIcon, ViewQuote } from '@/components';
import { useMovie } from '@/hooks';

export default function News() {
  const {
    isLoadingQuotes,
    allQuotes,
    setActiveQuotesSearch,
    hasQuotesNextPage,
    fetchQuotesNextPage,
    isFetchingQuotesNextPage,
  } = useMovie();

  if (isLoadingQuotes) return <div>Loading...</div>;

  return (
    <Layout setActiveSearch={setActiveQuotesSearch}>
      <div className='flex'>
        <section className='flex flex-col gap-5 w-full max-w-235 mr-auto md:ml-30'>
          <header className='flex gap-6 md:text-xl items-center'>
            <div className='flex gap-4 flex-1 md:bg-obsidian px-8 md:px-4 py-8 md:py-3 rounded-xl items-center'>
              <PencilIcon />
              <span>Write new quote</span>
            </div>

            <div className='hidden md:flex md:gap-4 md:items-center'>
              <SearchIcon />
              <span>Search by</span>
            </div>
          </header>

          {allQuotes && (
            <main className='flex flex-col gap-8'>
              {allQuotes.map((quote) => (
                <div className='bg-slate-950 px-9 py-8'>
                  <ViewQuote quote={quote} readonly />
                </div>
              ))}

              {hasQuotesNextPage && (
                <div className='flex justify-center py-8'>
                  <button
                    onClick={() => fetchQuotesNextPage()}
                    disabled={isFetchingQuotesNextPage}
                    className='px-6 py-3 text-lg text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:cursor-pointer'
                  >
                    {isFetchingQuotesNextPage
                      ? 'Loading...'
                      : 'Load More Quotes'}
                  </button>
                </div>
              )}
            </main>
          )}
        </section>
      </div>
    </Layout>
  );
}
