import { UserInfoType } from '@/types/common';

interface Props {
  userInfo: UserInfoType;
}

function UserInfo({ userInfo }: Props) {
  const {
    created_at,
    email,
    id,
    is_banned,
    last_visited,
    nickname,
    profile_img,
    rank_level,
    rank_name,
    visit_count,
  } = userInfo;

  return (
    <div>
      <span>닉네임 {nickname}</span>
      <span>이메일 {email}</span>
      <span>등급 {rank_name}</span>
      <span>카페방문수 {visit_count}</span>
      <span>정지여부: {is_banned ? 'YES' : 'NO'}</span>
      <span>가입일자 {created_at?.toDateString()}</span>
      <span>마지막방문일 {last_visited?.toDateString()}</span>
    </div>
  );
}

export default UserInfo;
