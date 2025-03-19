import { User } from "./user.interface";

export interface Post {
  _id?: string;
  message?: string;
  imgs?: string[] | any;
  coords?: string;
  user?: User | any;
  created?: string;
  __v?: number;
  img?: any[] | string;
}

