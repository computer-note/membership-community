import { SupabaseApi } from '@/api/supabase.api';
import UserList from './_components/UserList';

async function AdminPage() {
  const userList = await SupabaseApi.getUserList();

  return (
    <section>
      <UserList userList={userList} />
    </section>
  );
}

export default AdminPage;
