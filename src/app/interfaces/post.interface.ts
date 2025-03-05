import { User } from "./user.interface";

export interface Post {
  _id?: string;
  message?: string;
  imgs?: string[];
  coords?: string;
  user?: User;
  created?: string;
  __v?: number;
  img?: any[] | string;
}

