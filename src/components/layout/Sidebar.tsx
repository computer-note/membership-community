import InfoPanel from './InfoPanel';
import BoardList from './BoardList';
import AccountDelete from './AccountDelete';
import CacheBoardList from './CacheBoardList';

import { SupabaseServerApi } from '@/api/supabase.server.api';

async function Sidebar() {
  const boardList = await SupabaseServerApi.getBoardList();

  return (
    <>
      <aside className='w-[200px]'>
        <InfoPanel />
        <BoardList boardList={boardList} />
        <AccountDelete />
      </aside>

      <CacheBoardList boardList={boardList} />
    </>
  );
}

export default Sidebar;
