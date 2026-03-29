
import { PostsResponse } from "../types/posts.types";
import { fetchWithAuth } from "@/features/auth/services/fetchWithAuth";

export const deletePosts = async (
  userId: number = 0
): Promise<PostsResponse> => {
  const response = await fetchWithAuth<PostsResponse>(`api/posts/delete/${userId}`,
    {
      method: 'DELETE'
    }
  );
  return response;
};