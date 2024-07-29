import { SupabaseApi } from '@/api/supabase.api';
import UserList from './_components/UserList';

async function AdminPage() {
  const userList = await SupabaseApi.getUserList();

  return (
    <main>
      <UserList userList={userList} />
    </main>
  );
}

export default AdminPage;
