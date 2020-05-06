import { Comment } from "./comment";
export interface Post {
  postId?: number;
  userId?: number;
  postText?: string;
  postMedia?: string;
  comment?: Comment[];
  like?: number;
}
