import {
  useCommentDeleteMutation,
  useCommentUpdateMutation,
} from './useCommentTanstack';

function useCommentHandlers(postId: string, comment_id: string) {
  const commentDeleteMutation = useCommentDeleteMutation(
    postId,
    comment_id
  );
  const commentUpdateMutation = useCommentUpdateMutation(
    postId,
    comment_id
  );

  function handleCreateComment() {}

  function handleModifyComment(content: string) {
    commentUpdateMutation.mutate(content);
  }

  function handleDeleteComment() {
    commentDeleteMutation.mutate();
  }

  return {
    handleModifyComment,
    handleDeleteComment,
    handleCreateComment,
  };
}

export default useCommentHandlers;
