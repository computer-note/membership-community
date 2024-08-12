import { PostItemType } from '@/types/common';
import PostItem from './PostItem';

interface Props {
  postList: PostItemType[];
}

function PostList({ postList }: Props) {
  return (
    <table>
      {postList.map(postItem => (
        <tbody>
          <tr key={postItem.id}>
            <PostItem postItem={postItem} />
          </tr>
        </tbody>
      ))}
    </table>
  );
}

export default PostList;
