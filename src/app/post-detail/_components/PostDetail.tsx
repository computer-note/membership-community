import 'react-quill/dist/quill.snow.css';

import ImageWithFallback from '@/components/ImageWithFallback';

import {
  convertWonFormat,
  extractHHMM,
  extractYYYYMMDD,
} from '@/utils/format';
import { PostDetailType } from '@/types/common';

interface Props {
  postDetail: PostDetailType;
}

function PostDetail({ postDetail }: Props) {
  const {
    board_name,
    content,
    created_at,
    item_img,
    price,
    title,
    user_nickname,
    user_rank_name,
    visited_count,
    user_profile_img,
  } = postDetail;

  return (
    <>
      <section>
        <section className='flex flex-col border-b border-[#ebecef]'>
          <div className='text-[#03c75a] cursor-pointer w-fit'>
            {board_name}
          </div>
          <h1 className='text-[26px] mt-[7px]'>{title}</h1>
          <div className='flex mt-[10px]'>
            <div className='flex items-center mr-[10px]'>
              <ImageWithFallback
                src={user_profile_img}
                alt='프로필 이미지'
                width={36}
                height={36}
              />
            </div>
            <div className='text-[13px] '>
              <div>
                <span className='font-bold mr-[6px]'>
                  {user_nickname}
                </span>
                <span>{user_rank_name}</span>
              </div>
              <div className='text-[#979797]'>
                <span className='mr-[6px]'>
                  {extractYYYYMMDD(created_at)}
                </span>
                <span className='mr-[6px]'>
                  {extractHHMM(created_at)}
                </span>
                <span>조회 {visited_count}</span>
              </div>
            </div>
          </div>
        </section>

        <section className='flex mt-[20px] mb-[30px] '>
          <div className='mr-[10px]'>
            <ImageWithFallback
              src={item_img}
              alt='상품이미지'
              width={380}
              height={380}
              fallback='/cafeprofile_58X58_3x.png'
            />
          </div>
          <div className='flex flex-col border-b border-[#ebecef] h-fit'>
            <div className='text-[14px] mb-[7px]'>{board_name}</div>
            <div className='text-[22px] mb-[6px]'>{title}</div>
            <div className='text-[26px] font-[700]'>
              {convertWonFormat(price)}원
            </div>
          </div>
        </section>

        <section
          className='ql-editor'
          dangerouslySetInnerHTML={{ __html: content }}
        ></section>
      </section>
    </>
  );
}

export default PostDetail;
