import {
  BoardType,
  PostDetailType,
  PostItemType,
  UserInfoType,
} from '@/types/common';
import { type PaginationInfoType } from '@/types/utils';

//dummy datas
import {
  board1,
  board2,
  comment1,
  comment2,
  comment3,
  comment4,
  postDetail1,
  postDetail2,
  postItem1,
  postItem2,
  userInfo1,
  userInfo2,
} from '@/dummy-data/dummy-data';

export class SupabaseApi {
  static async getPostList(
    boardId: string,
    paginationInfo?: PaginationInfoType
  ): Promise<PostItemType[]> {
    const allPostItems = [postItem1, postItem2];

    const postItemByBoardId = allPostItems.filter(
      postItem => postItem.board.id === boardId
    );

    return postItemByBoardId;
  }

  static async getBoardList(): Promise<BoardType[]> {
    const allBoardList = [board1, board2];

    return allBoardList;
  }

  static async getPostDetail(
    postId: string
  ): Promise<PostDetailType | null> {
    const allPostDetails = [postDetail1, postDetail2];

    const postDetailByPostId = allPostDetails.find(
      postDetail => postDetail.id === postId
    );

    if (!postDetailByPostId) {
      return null;
    }

    return postDetailByPostId;
  }

  static async getCommentList(postId: string) {
    const allComments = [comment1, comment2, comment3, comment4];

    const commentList = allComments.filter(
      comment => comment.postId === postId
    );

    return commentList;
  }

  static async getUserList(): Promise<UserInfoType[]> {
    const allUserList = [userInfo1, userInfo2];

    return allUserList;
  }
}
