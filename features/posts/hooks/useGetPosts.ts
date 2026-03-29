import { useQuery } from "@tanstack/react-query";
import { getPostsAction } from "../services/getPosts";

export const useGetPosts = (userId: number) => {
  
  return useQuery({
    queryKey: ["posts", {userId}],
    queryFn: () => getPostsAction(userId),
    staleTime: 1000 * 60 * 1, // 1 minutos
  });
};