'use client';

import { useBoardListQuery } from '@/hooks/useBoardTanstack';
import { useMount } from '@/hooks/useMount';
import { useState } from 'react';

interface Props {
  className: string;
  name: string;
  user_level: number;
  defaultSelectedBoardId: number;
}

function BoardSelect({
  className,
  name: htmlName,
  user_level,
  defaultSelectedBoardId,
}: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const { data: boardList } = useBoardListQuery();

  const accessibleBoardList = boardList?.filter(
    ({ rank_level }) => rank_level <= user_level
  );

  useMount(() => {
    setIsMounted(true);
    setSelected(defaultSelectedBoardId);
  });

  return (
    <select
      className={className}
      name={htmlName}
      value={selected}
      onChange={e => setSelected(+e.target.value)}
    >
      <option value={0} className='h-[48px]'>
        게시판을 선택해주세요.
      </option>

      {isMounted &&
        accessibleBoardList?.map(({ id, name }) => (
          <option key={id} value={id} selected>
            {name}
          </option>
        ))}
    </select>
  );
}

export default BoardSelect;
