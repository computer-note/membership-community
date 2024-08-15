import { PostItemType } from '@/types/common';
import { extractYYYYMMDD } from '@/utils/format';
import Link from 'next/link';

interface Props {
  postItem: PostItemType;
}

function PostItem({ postItem }: Props) {
  const { created_at, title, visited_count, id: postId } = postItem;

  return (
    <>
      <td className='pl-[4px]'>
        <span className='w-[30px] inline-block'>
          <input type='checkbox' data-post-id={postId} />
        </span>
        <Link
          href={`/post-detail/${postId}`}
          className='hover:underline'
        >
          {title}
        </Link>
      </td>
      <td className='text-center'>{extractYYYYMMDD(created_at)}</td>
      <td className='text-center'>{visited_count}</td>
    </>
  );
}

export default PostItem;
