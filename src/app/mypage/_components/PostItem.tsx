import { PostItemType } from '@/types/common';
import { extractYYYYMMDD } from '@/utils/format';

interface Props {
  postItem: PostItemType;
}

function PostItem({ postItem }: Props) {
  const { created_at, title, visited_count } = postItem;

  return (
    <>
      <td className='pl-[4px]'>
        <span className='w-[30px] inline-block'>
          <input type='checkbox' />
        </span>
        <span>{title}</span>
      </td>
      <td className='text-center'>{extractYYYYMMDD(created_at)}</td>
      <td className='text-center'>{visited_count}</td>
    </>
  );
}

export default PostItem;
