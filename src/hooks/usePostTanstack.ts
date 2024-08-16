import { QKEY_POST_LIST } from '@/constants/querykey';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { type PostFormType, type PostItemType } from '@/types/common';

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

export function usePostCreateMutation() {
  return useMutation({
    mutationFn: (postForm: PostFormType) =>
      SupabaseBrowserApi.createPost(postForm),

    onSuccess: (_: string, { user_id, board_id }: PostFormType) => {
      _invalidatePostListQuery(user_id, board_id);
    },
  });
}

export function usePostModifyMutation() {
  return useMutation({
    mutationFn: (postForm: PostFormType) =>
      SupabaseBrowserApi.modifyPost(postForm),

    onSuccess: (_: void, { user_id, board_id }: PostFormType) => {
      _invalidatePostListQuery(user_id, board_id);
    },
  });
}

function _invalidatePostListQuery(userId: string, boardId: number) {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({
    queryKey: [QKEY_POST_LIST, userId],
    refetchType: 'all',
  });

  queryClient.invalidateQueries({
    queryKey: [QKEY_POST_LIST, boardId],
    refetchType: 'all',
  });
}
