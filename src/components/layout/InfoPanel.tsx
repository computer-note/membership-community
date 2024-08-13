'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/providers/AuthContextProvider';

import Link from 'next/link';
import Image from 'next/image';
import ImageWithFallback from '../ImageWithFallback';

import { extractYYYYMMDD, trucateWithEllipses } from '@/utils/format';
import Profile from './Profile';

type TabListType = 'Cafe' | 'User';

function InfoPanel() {
  const router = useRouter();
  const user = useAuthContext();
  const [selectedTab, setSelectedTab] = useState<TabListType>('Cafe');

  function handleCafeTabClick() {
    setSelectedTab('Cafe');
  }

  function handleMyProfileTabClick() {
    if (user) {
      setSelectedTab('User');
    } else {
      alert('로그인을 해주세요!');
      router.push('/login');
    }
  }

  return (
    <div className='px-[10px] pb-[10px] border-t-2 border-solid border-black '>
      <div className='flex text-[13px]'>
        <button
          onClick={handleCafeTabClick}
          className='w-[50%] h-[38px]'
        >
          카페정보
        </button>
        <button
          onClick={handleMyProfileTabClick}
          className='w-[50%] h-[38px]'
        >
          나의활동
        </button>
      </div>

      {selectedTab === 'Cafe' ? (
        <Profile
          created_at={new Date('2003-12-10')}
          nickname={'중고나라'}
          profile_img={'/cafeprofile_58X58_3x.png'}
          rankname={'매니저'}
          isUser={false}
        />
      ) : null}

      {selectedTab === 'User' && user ? (
        <Profile
          created_at={user.created_at}
          nickname={user.nickname}
          profile_img={user.profile_img!}
          rankname={user.rank_name}
          isUser={true}
        />
      ) : null}
    </div>
  );
}

export default InfoPanel;
