import { usePostsStore } from "../store/posts.store";
import { PostsResponse } from "../types/posts.types";
import { fetchWithAuth } from "@/features/auth/services/fetchWithAuth";

export const getPostsAction = async (
  userId: number = 0
): Promise<PostsResponse> => {
  const {deletedPostIds, createdPosts} = usePostsStore.getState();
  const response = await fetchWithAuth<PostsResponse>(`api/posts/list/${userId}`);
  const joinedData = [...response.data, ...createdPosts];
  return {
    ...response,
    data: joinedData.filter(post => !deletedPostIds.includes(post.id))
  };
};