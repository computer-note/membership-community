import { SupabaseServerApi } from '@/api/supabase.server.api';
import Link from 'next/link';

async function BoardList() {
  const boardList = await SupabaseServerApi.getBoardList();

  return (
    <section className='flex flex-col'>
      {boardList.map(board => (
        <Link
          key={board.id}
          href={`/board/${board.id}`}
        >{`${board.name} (${board.rank_name}) `}</Link>
      ))}
    </section>
  );
}

export default BoardList;
