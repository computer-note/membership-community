'use client';

import { useBoardListQueryWithInitData } from '@/hooks/useBoardTanstack';
import { BoardType } from '@/types/common';

interface Props {
  boardList: BoardType[];
}

function CacheBoardList({ boardList: boardListIntiialData }: Props) {
  useBoardListQueryWithInitData(boardListIntiialData);

  return <></>;
}

export default CacheBoardList;
