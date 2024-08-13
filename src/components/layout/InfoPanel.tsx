'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/providers/AuthContextProvider';

import Link from 'next/link';
import Image from 'next/image';
import ImageWithFallback from '../ImageWithFallback';

import { extractYYYYMMDD, trucateWithEllipses } from '@/utils/format';

type TabListType = 'Cafe' | 'User';
const NICKNAME_TRUCNCATE_LIMIT = 10;

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
        <div className='flex gap-[8px] pt-[15px] pb-[12px]'>
          <Image
            src={'/cafeprofile_58X58_3x.png'}
            width={58}
            height={58}
            alt='cafe-profile'
            className='h-[inherit]'
          />
          <div className='flex flex-col justify-center text-[13px]'>
            <div>
              <span className='font-[700]'>중고나라</span>
              <span>매니저</span>
            </div>
            <span>2003.12.10 개설</span>
          </div>
        </div>
      ) : null}

      {selectedTab === 'User' ? (
        <div className='flex gap-[8px] pt-[15px] pb-[12px]'>
          <ImageWithFallback
            src={user?.profile_img!}
            width={58}
            height={58}
            alt='default_profile'
            className='h-[inherit]'
          />

          <div className='flex flex-col justify-center text-[13px] gap-[6px]'>
            <Link href={'/mypage'} className='hover:underline'>
              <span className='font-[700]'>
                {trucateWithEllipses(
                  user?.nickname! + user?.rank_name!,
                  NICKNAME_TRUCNCATE_LIMIT
                )}
              </span>
            </Link>

            <span className='text-[#666666]'>
              {extractYYYYMMDD(user?.created_at)} 가입
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default InfoPanel;
