import { QKEY_USER_POST_LIST } from '@/constants/querykey';
import { useQuery } from '@tanstack/react-query';

import { PostItemType } from '@/types/common';

import { SupabaseBrowserApi } from '@/api/supabase.browser.api';

export function usePostListByUserIdQuery(
  userId: string,
  initialData: PostItemType[]
) {
  return useQuery({
    initialData,
    queryKey: [QKEY_USER_POST_LIST, userId],
    queryFn: () => SupabaseBrowserApi.getPostListByUserId(userId),
  });
}

export function usePostListByBoardIdQuery(
  boardId: string,
  initialData: PostItemType[]
) {
  return useQuery({
    initialData,
    queryKey: [QKEY_USER_POST_LIST, boardId],
    queryFn: () => SupabaseBrowserApi.getPostListByBoardId(boardId),
  });
}
