import { QKEY_COMMENT_LIST } from '@/constants/querykey';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  type CommentCreateFormType,
  type CommentType,
} from '@/types/common';

import { SupabaseBrowserApi } from '@/api/supabase.browser.api';

export function useCommentCreateMutation(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QKEY_COMMENT_LIST, postId],
    mutationFn: (commentForm: CommentCreateFormType) =>
      SupabaseBrowserApi.createComment(commentForm),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QKEY_COMMENT_LIST, postId],
      }),
  });
}

export function useCommentListQuery(
  postId: string,
  initialData: CommentType[]
) {
  return useQuery({
    initialData,
    queryKey: [QKEY_COMMENT_LIST, postId],
    queryFn: () => SupabaseBrowserApi.getCommentList(postId),
  });
}

export function useCommentUpdateMutation(
  postId: string,
  comment_id: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QKEY_COMMENT_LIST, postId],
    mutationFn: (content: string) =>
      SupabaseBrowserApi.modifyComment({
        comment_id,
        content,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QKEY_COMMENT_LIST, postId],
      }),
  });
}

export function useCommentDeleteMutation(
  postId: string,
  comment_id: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QKEY_COMMENT_LIST, postId],
    mutationFn: () => SupabaseBrowserApi.deleteComment(comment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QKEY_COMMENT_LIST, postId],
      });
    },
  });
}
