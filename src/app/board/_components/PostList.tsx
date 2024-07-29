import { PostItemType } from '@/types/common';
import PostItem from './PostItem';
interface Props {
  postList: PostItemType[];
}

function PostList({ postList }: Props) {
  return (
    <section>
      {postList.map(postItem => (
        <PostItem key={postItem.id} postItem={postItem} />
      ))}
    </section>
  );
}

export default PostList;
