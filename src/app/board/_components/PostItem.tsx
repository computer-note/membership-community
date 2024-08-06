import { PostItemType } from '@/types/common';
import { extractYYYYMMDD } from '@/utils/date';
import Link from 'next/link';

interface Props {
  postItem: PostItemType;
}

function PostItem({ postItem }: Props) {
  const {
    board_name,
    board_rank_level,
    created_at,
    id: post_id,
    title,
    user_id,
    user_nickname,
    user_rank_name,
    visited_count,
  } = postItem;

  return (
    <tr className='border-y border-[#f2f2f2] text-[13px] *:py-[4px]'>
      <td className='pl-[12px]'>
        <Link
          href={`/post-detail/${post_id}`}
          className='hover:cursor-pointer hover:underline'
        >
          {title}
        </Link>
      </td>
      <td>
        <span className='hover:cursor-pointer hover:underline'>
          {user_nickname}
        </span>
      </td>
      <td className='text-center'> {extractYYYYMMDD(created_at)}</td>
      <td className='text-center'> {visited_count}</td>
    </tr>
  );
}

export default PostItem;
