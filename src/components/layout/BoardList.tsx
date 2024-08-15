import { BoardType } from '@/types/common';
import Link from 'next/link';

interface Props {
  boardList: BoardType[];
}

function BoardList({ boardList }: Props) {
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
