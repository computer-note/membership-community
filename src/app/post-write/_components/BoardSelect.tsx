'use client';

import { useBoardListQuery } from '@/hooks/useBoardTanstack';
import { useMount } from '@/hooks/useMount';
import { useState } from 'react';

interface Props {
  className: string;
  htmlName: string;
  user_level: number;
  defaultSelectedBoardId: string | '';
}

function BoardSelect({
  className,
  htmlName,
  user_level,
  defaultSelectedBoardId,
}: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | ''>('');
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
      onChange={e => setSelected(e.target.value)}
    >
      <option value={''} className='h-[48px]'>
        게시판을 선택해주세요.
      </option>

      {isMounted &&
        accessibleBoardList?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
    </select>
  );
}

export default BoardSelect;
