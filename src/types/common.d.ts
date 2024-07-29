export type UserInfoType = {
  id: string;
  email: string;
  createdAt: Date;
  nickname: string;
  profileImg: string;
  lastVisited: Date;
  visitCount: number;
  rank: RankType;
};

//포스트 요약 정보 (포스트 리스트에서 사용)
export type PostItemType = {
  id: string;
  title: string;
  creatorNickname: string;
  createdAt: Date;
  visitedCount: number;
  rank: RankType;
};

export type PostDetailType = {
  id: string;
  title: string;
  createdAt: Date;
  price: number;
  itemImg: string;
  visitedCount: number;
  userInfo: UserInfoType;
  rank: RankType;
  board: BoardType;
};

export type PostFormType = {
  title: string;
  itemImg: string;
  content: string;
  userId: string;
  boardId: string;
};

export type CommentType = {
  id: string;
  createdAt: Date;
  userInfo: UserInfoType;
  postId: string;
};

export type CommentFormType = {
  content: string;
  userId: string;
  postId: string;
};

export type RankType = {
  id: string;
  name: string;
  level: number;
};

export type BoardType = {
  id: string;
  name: string;
  rank: RankType;
};

export type LoginFormInfo = {
  email: string;
  password: string;
};

export type SignupFormType = {
  email: string;
  password: string;
  nickname: string;
  profileImg: string;
};
