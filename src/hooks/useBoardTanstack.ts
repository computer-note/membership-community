import { SupabaseBrowserApi } from '@/api/supabase.browser.api';
import { QKEY_BOARD_LIST } from '@/constants/querykey';
import { BoardType } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

export function useBoardListQueryWithInitData(
  initialData: BoardType[]
) {
  return useQuery({
    initialData,
    queryKey: [QKEY_BOARD_LIST],
    queryFn: () => SupabaseBrowserApi.getBoardList(),
  });
}

export function useBoardListQuery() {
  return useQuery({
    queryKey: [QKEY_BOARD_LIST],
    queryFn: () => SupabaseBrowserApi.getBoardList(),
  });
}
