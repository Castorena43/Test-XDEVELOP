import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostsStore } from "../store/posts.store";
import { createPosts } from "../services/createPosts";


export const useCreatePosts = () => {
  
  const queryClient = useQueryClient();
  const { createPost } = usePostsStore();
  return useMutation({
    mutationFn: createPosts,
    onSuccess: (data, post) => {
      createPost(data.data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      
    }
  });
};