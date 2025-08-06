import { Layout, PencilIcon, SearchIcon } from '@/components';

export default function News() {
  return (
    <Layout>
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

          <main className='flex flex-col gap-8'></main>
        </section>
      </div>
    </Layout>
  );
}
