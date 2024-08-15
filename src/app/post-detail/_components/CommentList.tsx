'use client';

import CommentItem from './CommentItem';
import { useAuthContext } from '@/providers/AuthContextProvider';
import { useCommentListQuery } from '@/hooks/useCommentTanstack';
import { CommentType } from '@/types/common';

interface Props {
  postId: string;
  commentList: CommentType[];
}

function CommentList({
  postId,
  commentList: commentListInitialData,
}: Props) {
  const user = useAuthContext();

  const { data: commentList } = useCommentListQuery(
    postId,
    commentListInitialData
  );

  return (
    <ul className='flex flex-col items-center gap-5 p-2'>
      {commentList?.map(commentItem => {
        const isOwnedByLoginUser =
          user && user.id === commentItem.user_id ? true : false;

        return (
          <CommentItem
            key={commentItem.id}
            commentItem={commentItem}
            isOwnedByLoginUser={isOwnedByLoginUser}
            postId={postId}
          />
        );
      })}
    </ul>
  );
}

export default CommentList;
