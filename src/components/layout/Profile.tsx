import { extractYYYYMMDD, trucateWithEllipses } from '@/utils/format';
import ImageWithFallback from '../ImageWithFallback';
import Link from 'next/link';

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
        {isUser === true ? (
          <Link href={'/mypage'} className='hover:underline'>
            <span className='font-[700]'>
              {trucateWithEllipses(
                nickname + rankname,
                NICKNAME_TRUCNCATE_LIMIT
              )}
            </span>
          </Link>
        ) : null}

        {isUser === false ? (
          <div className='hover:underline'>
            <span className='font-[700]'>
              {trucateWithEllipses(
                nickname + rankname,
                NICKNAME_TRUCNCATE_LIMIT
              )}
            </span>
          </div>
        ) : null}

        <span className='text-[#666666]'>
          {extractYYYYMMDD(created_at)} {isUser ? '가입' : '개설'}
        </span>
      </div>
    </div>
  );
}

export default Profile;
