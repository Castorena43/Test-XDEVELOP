import { Post, PostCreateResponse, RequestPost } from "../types/posts.types";
import { fetchWithAuth } from "@/features/auth/services/fetchWithAuth";

export const editPosts = async (
  data: Post,
): Promise<PostCreateResponse> => {
  const response = await fetchWithAuth<PostCreateResponse>(`api/posts/edit`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    }
  );
  return response;
};