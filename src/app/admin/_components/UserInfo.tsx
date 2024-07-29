import { UserInfoType } from '@/types/common';

interface Props {
  userInfo: UserInfoType;
}

function UserInfo({ userInfo }: Props) {
  const {
    createdAt,
    email,
    id,
    lastVisited,
    nickname,
    profileImg,
    rank,
    visitCount,
  } = userInfo;

  return (
    <div>
      <span>가입일자 {createdAt.toDateString()}</span>
      <span>이메일 {email}</span>
      <span>닉네임 {nickname}</span>
      <span>등급 {rank.name}</span>
      <span>카페방문수 {visitCount}</span>
      <span>마지막방문일 {lastVisited.toDateString()}</span>
    </div>
  );
}

export default UserInfo;
