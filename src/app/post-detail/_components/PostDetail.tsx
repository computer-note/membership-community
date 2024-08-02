import { PostDetailType } from '@/types/common';

interface Props {
  postDetail: PostDetailType;
}

function PostDetail({ postDetail }: Props) {
  const {
    board_name,
    content,
    created_at,
    id,
    item_img,
    price,
    title,
    user_id,
    user_nickname,
    user_rank_name,
    visited_count,
  } = postDetail;

  return (
    <section key={id} className='flex flex-col gap-1'>
      <span>게시판: {board_name}</span>
      <span>작성자: {user_nickname}</span>
      <span>작성자 등급: {user_rank_name}</span>
      <span>작성일: {created_at.toDateString()}</span>
      <span>조회수: {visited_count}</span>
      <span>제목: {title}</span>
      <span>가격: {price}</span>
      <span>내용: {content}</span>
    </section>
  );
}

export default PostDetail;
