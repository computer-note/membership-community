import { PostDetailType } from '@/types/common';

interface Props {
  postDetail: PostDetailType;
}

function PostDetail({ postDetail }: Props) {
  const {
    board,
    content,
    createdAt,
    id,
    itemImg,
    price,
    title,
    userInfo,
    visitedCount,
  } = postDetail;

  return (
    <section className='flex flex-col gap-1'>
      <span>게시판: {board.name}</span>
      <span>작성자: {userInfo.nickname}</span>
      <span>작성자 등급: {userInfo.rank.name}</span>
      <span>작성일: {createdAt.toDateString()}</span>
      <span>조회수: {visitedCount}</span>
      <span>제목: {title}</span>
      <span>가격: {price}</span>
      <span>내용: {content}</span>
    </section>
  );
}

export default PostDetail;
