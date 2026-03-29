import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { Post } from "../types/posts.types";

type PostsState = {
  deletedPostIds: number[];
  createdPosts: Post[],
  favorites: number[],
  setFavorite: (id: number) => void,
  markDeleted: (id: number) => void,
  createPost: (data: Post) => void,
};

export const usePostsStore = create<PostsState>()(
  devtools(
    persist(
      (set) => ({
        deletedPostIds: [],
        createdPosts: [],
        favorites: [],
        markDeleted: (id) =>
          set((state) => ({
            deletedPostIds: [...new Set([...state.deletedPostIds, id])],
          })),
        createPost: (data) => 
          set((state) => ({
            createdPosts: [...state.createdPosts, data]
          })),
        setFavorite: (id) => 
          set((state) => ({
            favorites: (state.favorites.some(f => f === id) ? [...state.favorites.filter(f => f !== id)] : [...state.favorites, id])
          }))
      }),
      {
        name: "posts-storage",
        storage: createJSONStorage(() =>localStorage),
      }
    )
  )
);