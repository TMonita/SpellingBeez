import React from 'react';
import NavBar from '../components/Navbar';

export default function Admin() {
  // hard-coded rows
  const latestUsers = [
    {
      id: '#123456',
      date: '21/03/2021',
      email: 'abc@gmail.com',
      words: 10,
      correct: 5
    },
    {
      id: '#123456',
      date: '21/03/2021',
      email: 'abc@gmail.com',
      words: 10,
      correct: 5
    },
    {
      id: '#123456',
      date: '21/03/2021',
      email: 'abc@gmail.com',
      words: 10,
      correct: 5
    },
    {
      id: '#123456',
      date: '21/03/2021',
      email: 'abc@gmail.com',
      words: 10,
      correct: 5
    }
  ];

  const StatCard = ({ value, label, variant }) => {
    const colors = {
      purple: 'bg-[#7C7CF2]',
      blue: 'bg-[#8DC5F8]',
      orange: 'bg-[#F8C47A]',
      red: 'bg-[#F49B8E]'
    };
    return (
      <div className='rounded-2xl border border-[#eee] p-5 w-full shadow-sm'>
        <div className='text-3xl font-bold'>{value}</div>
        <div className='mt-1 text-sm text-[#7C7C7C] font-semibold'>{label}</div>
        <div className='mt-1 text-xs text-[#BDBDBD]'>+15%</div>
        <div className='flex items-end gap-1 mt-2'>
          {[10, 16, 8, 18, 12].map((h, i) => (
            <div
              key={i}
              className={`${colors[variant]} w-2 rounded-sm`}
             style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='flex justify-center items-start'>
      <div className='w-[900px] flex flex-col py-5'>
        <NavBar />

        {/* Greeting */}
        <div className='mt-10 text-center'>
          <p className='text-xl tracking-widest'>HELLO</p>
          <p className='text-3xl font-semibold mt-1'>ADMIN,</p>
        </div>

        {/* Stats */}
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard value={1234} label='ALL USERS' variant='purple' />
          <StatCard value={654} label='NEW USERS' variant='orange' />
          <StatCard value={765} label='Right Words' variant='blue' />
          <StatCard value={456} label='Wrong Words' variant='red' />
        </div>

        {/* Table */}
        <div className='mt-12'>
          <p className='text-sm font-semibold tracking-wide mb-3'>
            LASTEST USER
          </p>

          <div className='overflow-hidden rounded-2xl border border-[#eee] shadow-sm'>
            {/* Head */}
            <div className='bg-[#F8E090] px-6 py-4 text-sm font-semibold'>
              <div className='grid grid-cols-12'>
                <div className='col-span-2'>User ID</div>
                <div className='col-span-2'>Date</div>
                <div className='col-span-4'>Email</div>
                <div className='col-span-2'>Words of Guessing</div>
                <div className='col-span-2'>Correct answers</div>
              </div>
            </div>

            {/* Rows */}
            <ul className='divide-y divide-[#f2f2f2]'>
              {latestUsers.map((u, idx) => (
                <li key={idx} className='px-6 py-5 hover:bg-[#fafafa]'>
                  <div className='grid grid-cols-12 items-center text-sm'>
                    <div className='col-span-2'>{u.id}</div>
                    <div className='col-span-2'>{u.date}</div>
                    <div className='col-span-4'>{u.email}</div>
                    <div className='col-span-2'>{u.words}</div>
                    <div className='col-span-2'>{u.correct}</div>
                  </div>
                </li>
              ))}
            </ul>
            {/* Pagination */}
            <div className='flex justify-end items-center gap-3 px-6 py-4'>
              <button className='h-9 w-9 grid place-items-center rounded-full border border-[#eee]'>
                ‹
              </button>
              <button className='h-9 w-9 grid place-items-center rounded-full border border-[#eee] bg-[#F8E090] font-light'>
                1
              </button>
              <button className='h-9 w-9 grid place-items-center rounded-full border border-[#eee]'>
                2
              </button>
              <button className='h-9 w-9 grid place-items-center rounded-full border border-[#eee]'>
                3
              </button>
              <button className='h-9 w-9 grid place-items-center rounded-full border border-[#eee]'>
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

