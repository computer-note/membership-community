'use client';

import Image from 'next/image';
import { useState } from 'react';

type TabListType = 'Cafe' | 'User';

function InfoPanel() {
  const [selectedTab, setSelectedTab] = useState<TabListType>('Cafe');

  return (
    <div className='px-[10px] pb-[10px] border-t-2 border-solid border-black '>
      <div className='flex text-[13px]'>
        <button
          onClick={() => setSelectedTab('Cafe')}
          className='w-[50%] h-[38px]'
        >
          카페정보
        </button>
        <button
          onClick={() => setSelectedTab('User')}
          className='w-[50%] h-[38px]'
        >
          나의활동
        </button>
      </div>

      {selectedTab === 'Cafe' ? (
        <div className='flex gap-[8px] px-[10px] pt-[15px] pb-[12px]'>
          <Image
            src={'/cafeprofile_58X58_3x.png'}
            width={58}
            height={58}
            alt='cafe-profile'
            className='h-[inherit]'
          />
          <div className='flex flex-col justify-center text-[13px]'>
            <div>
              <span>중고나라</span> <span>매니저</span>
            </div>
            <span>2003.12.10 개설</span>
          </div>
        </div>
      ) : null}

      {selectedTab === 'User' ? (
        <div className='flex gap-[8px] px-[10px] pt-[15px] pb-[12px]'>
          <Image
            src={'/cafeprofile_58X58_3x.png'}
            width={58}
            height={58}
            alt='cafe-profile'
            className='h-[inherit]'
          />
          <div className='flex flex-col justify-center text-[13px]'>
            <div>
              <span>유저</span> <span>매니저</span>
            </div>
            <span>에 가입 개설</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default InfoPanel;
