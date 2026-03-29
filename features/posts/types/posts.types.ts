export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface RequestPost extends Omit<Post, 'id'> {}

export interface PostsResponse {
  ok: boolean,
  message: string;
  data: Post[]
}

export interface PostCreateResponse {
  ok: boolean,
  message: string;
  data: Post;
}

export const USERS = [
  {id: 1, name: 'Usuario 1'},
  {id: 2, name: 'Usuario 2'},
  {id: 3, name: 'Usuario 3'},
  {id: 4, name: 'Usuario 4'},
  {id: 5, name: 'Usuario 5'},
]