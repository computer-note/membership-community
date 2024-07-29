import { UserInfoType } from '@/types/common';
import UserInfo from './UserInfo';

interface Props {
  userList: UserInfoType[];
}

function UserList({ userList }: Props) {
  return (
    <section>
      {userList.map(userInfo => (
        <UserInfo key={userInfo.id} userInfo={userInfo} />
      ))}
    </section>
  );
}

export default UserList;
