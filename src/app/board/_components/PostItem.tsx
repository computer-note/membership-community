import { PostItemType } from '@/types/common';
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
    <Link className='flex gap-5' href={`/post-detail/${post_id}`}>
      <span>제목 {title}</span>
      <span>등급 {user_rank_name}</span>
      <span>작성자 {user_nickname}</span>
      <span>작성일 {created_at.toDateString()}</span>
      <span>조회수 {visited_count}</span>
    </Link>
  );
}

export default PostItem;
