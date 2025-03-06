import { Post } from "./post.interface";
import { User } from "./user.interface";


export interface PostsResponse {
  ok: boolean;
  page: number;
  posts: Post[];
  status:number;
}

export interface PostResponse {
  ok: boolean;
  post: Post;
  status:number;
  message?:string;
}

export interface UserResponse {
  ok: boolean;
  token:string;
  message?:string;
  status?:number;
  user?:User;
}
  