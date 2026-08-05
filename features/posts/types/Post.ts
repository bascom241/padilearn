export interface PostAuthor {
  _id: string;
  fullName: string;
  email: string;
}

export interface Post {
  _id: string;
  author: PostAuthor;
  content: string;
  tag?: string;
  likesCount: number;
  retweetsCount: number;
  repliesCount: number;
  isLikedByMe: boolean;
  isRetweetedByMe: boolean;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}
