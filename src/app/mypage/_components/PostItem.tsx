import { PostItemType } from '@/types/common';
import { extractYYYYMMDD } from '@/utils/format';

interface Props {
  postItem: PostItemType;
}

function PostItem({ postItem }: Props) {
  const {
    board_name,
    board_rank_level,
    created_at,
    id,
    title,
    user_id,
    user_nickname,
    user_rank_name,
    visited_count,
  } = postItem;

  return (
    <>
      <td>{extractYYYYMMDD(created_at)}</td>
      <td>{title}</td>
      <td>{user_nickname}</td>
      <td>{visited_count}</td>
    </>
  );
}

export default PostItem;
