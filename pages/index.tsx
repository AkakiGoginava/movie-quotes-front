import Image from 'next/image';

import { CaretIcon, Login, Register } from '@/components';

type Quote = {
  quote: string;
  movie: string;
  img: string;
};

export default function Home() {
  const quotes: Quote[] = [
    {
      quote: 'You have to leave somethig behind to go forward',
      movie: 'Interstellar, 2014',
      img: 'cover-image-1.png',
    },
    {
      quote:
        "I think we're just gonna have to be secretly in love with earch other and leave it that",
      movie: 'The Royal Tenenbaums, 2001 ',
      img: 'cover-image-2.png',
    },
    {
      quote: 'I see in your eyes the same fear that would take the heart of me',
      movie: 'The Lord of the Rings, 2003',
      img: 'cover-image-3.png',
    },
  ];

  return (
    <div className='relative flex flex-col w-screen h-screen bg-black'>
      <header className='fixed z-20 w-full flex gap-2 items-center px-4 md:px-17.5 py-7 bg-transparent'>
        <h3 className='font-medium text-light-yellow'>MOVIE QUOTES</h3>

        <div className='dropdown ml-auto'>
          <div
            tabIndex={0}
            role='button'
            className='btn bg-transparent border-none h-8 shadow-none'
          >
            <span>Eng</span>
            <CaretIcon />
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-obsidian rounded-box z-1 p-2 shadow-sm'
          >
            <li>
              <a>Eng</a>
            </li>
            <li>
              <a>Geo</a>
            </li>
          </ul>
        </div>

        <Login />

        <Register />
      </header>

      <main className='flex-1 h-full'>
        <section className='h-full flex flex-col gap-8 items-center justify-center '>
          <p className='w-70 md:w-175 font-bold text-2xl md:text-6xl text-light-yellow text-center'>
            Find any quote in millions of movie lines
          </p>

          <button type='button' className='btn btn-primary'>
            Get started
          </button>
        </section>

        <div className='relative'>
          {quotes.map((item, idx) => (
            <section
              key={idx}
              className='sticky top-0 w-full aspect-[9/20] md:aspect-[8/5]'
            >
              <div className='absolute inset-0 size-full bg-linear-to-r from-black/75 to-black/0 z-10' />

              <div className='relative top-1/2 -translate-y-1/2 mx-15 md:mx-60 w-82 md:w-207.5 flex flex-col gap-2.5 font-bold z-10'>
                <span className='absolute -left-6 md:-left-10 text-lg md:text-3xl'>
                  —
                </span>
                <p className='text-xl md:text-5xl'>“{item.quote}”</p>
                <p className='md:text-3xl'>{item.movie}</p>
              </div>

              <Image
                src={`/assets/${item.img}`}
                alt='cover'
                fill
                className='object-cover object-center md:object-contain'
              />
            </section>
          ))}
        </div>
        <footer className='w-full bg-[#181623] text-2xs md:text-xs py-2.5 md:py-4 px-8.5 md:px-17.5 text-light-yellow font-medium p'>
          © 2022 movie quotes. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
