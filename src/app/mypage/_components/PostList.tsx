import { PostItemType } from '@/types/common';
import PostItem from './PostItem';

interface Props {
  postList: PostItemType[];
}

function PostList({ postList }: Props) {
  return (
    <table className='border-t border-[#666]  text-[13px] '>
      <thead className='h-[45px] border-b border-[#f2f2f2]'>
        <tr>
          <th className='w-[660px]'>제목</th>
          <th className='w-[120px]'>작성일</th>
          <th className='w-[80px]'>조회</th>
        </tr>
      </thead>
      <tbody>
        {postList.map(postItem => (
          <tr
            key={postItem.id}
            className='h-[38px] border-b border-[#f2f2f2]'
          >
            <PostItem postItem={postItem} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PostList;
