import { AddMovie, Layout, SearchIcon } from '@/components';

export default function Movies() {
  return (
    <Layout>
      <div>
        <section className='w-full px-9 md:pl-20 md:pr-17 flex flex-col gap-10'>
          <header className='flex md:items-center justify-between py-4 md:py-0'>
            <div className='text-2xl font-medium text-wrap max-w-50 md:max-w-full'>
              My list of movies{' '}
              <span className='text-base md:text-2xl'>(Total 0)</span>
            </div>

            <div className='flex gap-8 items-center'>
              <div className='hidden md:flex md:gap-4 md:items-center'>
                <SearchIcon />
                <span>Search</span>
              </div>

              <AddMovie />
            </div>
          </header>
        </section>
      </div>
    </Layout>
  );
}
