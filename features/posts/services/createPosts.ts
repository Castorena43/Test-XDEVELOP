import { PostCreateResponse, RequestPost } from "../types/posts.types";
import { fetchWithAuth } from "@/features/auth/services/fetchWithAuth";

export const createPosts = async (
  data: RequestPost
): Promise<PostCreateResponse> => {
  const response = await fetchWithAuth<PostCreateResponse>(`api/posts/create`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  return response;
};