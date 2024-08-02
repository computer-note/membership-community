import { SupabaseServerApi } from '@/api/supabase.server.api';
import UserList from './_components/UserList';

async function AdminPage() {
  const userList = await SupabaseServerApi.getUserList();

  return (
    <section>
      <UserList userList={userList} />
    </section>
  );
}

export default AdminPage;
