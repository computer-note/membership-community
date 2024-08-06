import { PostItemType } from '@/types/common';
import PostItem from './PostItem';
interface Props {
  postList: PostItemType[];
}

function PostList({ postList }: Props) {
  return (
    <table>
      <thead className='border-t border-black'>
        <tr>
          <th className='w-[594px]'>제목</th>
          <th className='w-[118px]'>작성자</th>
          <th className='w-[80px]'>작성일</th>
          <th className='w-[60px]'>조회</th>
        </tr>
      </thead>
      <tbody>
        {postList.map(postItem => (
          <PostItem key={postItem.id} postItem={postItem} />
        ))}
      </tbody>
    </table>
  );
}

export default PostList;
