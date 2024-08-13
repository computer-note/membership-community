import { SupabaseServerApi } from '@/api/supabase.server.api';
import Link from 'next/link';

async function BoardList() {
  const boardList = await SupabaseServerApi.getBoardList();

  return (
    <ul className='px-[10px] mt-6 text-[13px] leading-[24px] '>
      {boardList.map(board => (
        <li key={board.id} className='hover:underline'>
          <img src='/board_prefix.png' className='inline mb-[1px]' />
          <Link href={`/board/${board.id}`}>{`${board.name}`}</Link>
        </li>
      ))}
    </ul>
  );
}

export default BoardList;
