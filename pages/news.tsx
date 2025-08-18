import { AddQuoteWithMovie, Layout, Search, ViewQuote } from '@/components';
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
        <section className='flex flex-col w-full max-w-235 mr-auto md:ml-30'>
          <header className='flex gap-6 md:text-xl items-center md:mb-6'>
            <AddQuoteWithMovie />

            <Search
              onSearch={(searchTerm: string) => {
                setActiveQuotesSearch(searchTerm);
              }}
              placeholder='Enter @ to search movies, Enter # to search quotes'
              className='md:block hidden'
            />
          </header>

          {allQuotes && (
            <main className='flex flex-col gap-8'>
              {allQuotes.map((quote) => (
                <div key={quote.id} className='bg-slate-950 px-9 py-8'>
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
