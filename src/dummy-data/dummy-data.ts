import {
  BoardType,
  CommentType,
  PostItemType,
  RankType,
  UserInfoType,
} from '@/types/common';

/* 더미데이터 리스트
  유저 2명
  게시판 2개
  등급 2개
  게시글 2개
  댓글 4개
*/

export const userInfo1: UserInfoType = {
  createdAt: new Date(),
  email: 'example@naver.com',
  id: 'user1',
  lastVisited: new Date(),
  nickname: 'my-nick-name',
  profileImg: '',
  rank: rank1,
  visitCount: 100,
};

export const userInfo2: UserInfoType = {
  createdAt: new Date(),
  email: 'user2@naver.com',
  id: 'user2',
  lastVisited: new Date(),
  nickname: 'user2-nickname',
  profileImg: '',
  rank: rank2,
  visitCount: 300,
};

export const board1: BoardType = {
  id: 'board1',
  name: '100만원 미만 물품 거래',
  rank: rank1,
};

export const board2: BoardType = {
  id: 'board2',
  name: '100만원 이상 물품 거래',
  rank: rank2,
};

export const rank1: RankType = {
  id: 'rank1',
  level: 1,
  name: '새싹',
};

export const rank2: RankType = {
  id: 'rank2',
  level: 2,
  name: '나무',
};

export const post1: PostItemType = {
  createdAt: new Date(),
  id: 'post1',
  title: '탁상시계 팝니다',
  board: board1,
  userInfo: userInfo1,
  visitedCount: 10,
};

export const post2: PostItemType = {
  createdAt: new Date(),
  id: 'post2',
  title: '컴퓨터 팝니다.',
  board: board2,
  userInfo: userInfo2,
  visitedCount: 50,
};

export const comment1: CommentType = {
  createdAt: new Date(),
  id: 'comment1',
  postId: 'post1',
  userInfo: userInfo1,
};

export const comment2: CommentType = {
  createdAt: new Date(),
  id: 'comment2',
  postId: 'post1',
  userInfo: userInfo1,
};

export const comment3: CommentType = {
  createdAt: new Date(),
  id: 'comment3',
  postId: 'post2',
  userInfo: userInfo2,
};
export const comment4: CommentType = {
  createdAt: new Date(),
  id: 'comment4',
  postId: 'post2',
  userInfo: userInfo2,
};
