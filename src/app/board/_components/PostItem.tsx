import { PostItemType } from '@/types/common';
import Link from 'next/link';

interface Props {
  postItem: PostItemType;
}

function PostItem({ postItem }: Props) {
  const { id, title, userInfo, board, createdAt, visitedCount } =
    postItem;

  return (
    <Link className='flex gap-5' href={`/post-detail/${id}`}>
      <span>식별번호 {id}</span>
      <span>제목 {title}</span>
      <span>등급 {userInfo.rank.name}</span>
      <span>작성자 {userInfo.nickname}</span>
      <span>작성일 {createdAt.toDateString()}</span>
      <span>조회수 {visitedCount}</span>
    </Link>
  );
}

export default PostItem;
