import { QKEY_POST_LIST } from '@/constants/querykey';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { PostItemType } from '@/types/common';

import { SupabaseBrowserApi } from '@/api/supabase.browser.api';

export function useUserPostListQuery(
  userId: string,
  initialData: PostItemType[]
) {
  return useQuery({
    initialData,
    queryKey: [QKEY_POST_LIST, userId],
    queryFn: () => SupabaseBrowserApi.getPostListByUserId(userId),
  });
}

export function useBoardPostListQuery(
  boardId: number,
  initialData: PostItemType[]
) {
  return useQuery({
    initialData,
    queryKey: [QKEY_POST_LIST, boardId],
    queryFn: () => SupabaseBrowserApi.getPostListByBoardId(boardId),
  });
}

export function usePostListDeleteMutation(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QKEY_POST_LIST, userId],
    mutationFn: (postIdList: string[]) =>
      SupabaseBrowserApi.deletePostList(postIdList),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QKEY_POST_LIST, userId],
      }),
  });
}
