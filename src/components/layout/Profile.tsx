import Link from 'next/link';
import ImageWithFallback from '../ImageWithFallback';
import { extractYYYYMMDD, trucateWithEllipses } from '@/utils/format';
import React from 'react';

interface Props {
  profile_img: string;
  nickname: string;
  rankname: string;
  created_at: Date;
  isUser: boolean;
}

const NICKNAME_TRUCNCATE_LIMIT = 10;

function Profile({
  created_at,
  nickname,
  profile_img,
  rankname,
  isUser,
}: Props) {
  const NicknameContainer = isUser ? Link : 'div';

  return (
    <div className='flex gap-[8px] pt-[15px] pb-[12px]'>
      <ImageWithFallback
        src={profile_img}
        width={58}
        height={58}
        alt='default_profile'
        className='h-[inherit]'
      />

      <div className='flex flex-col justify-center text-[13px] gap-[6px]'>
        <NicknameContainer
          href={'/mypage'}
          className='hover:underline'
        >
          <span className='font-[700]'>
            {trucateWithEllipses(
              nickname + rankname,
              NICKNAME_TRUCNCATE_LIMIT
            )}
          </span>
        </NicknameContainer>

        <span className='text-[#666666]'>
          {extractYYYYMMDD(created_at)} 가입
        </span>
      </div>
    </div>
  );
}

export default Profile;
