import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostsStore } from "../store/posts.store";
import { createPosts } from "../services/createPosts";
import { editPosts } from "../services/editPosts";


export const useEditPosts = () => {
  
  const queryClient = useQueryClient();
  const { createPost } = usePostsStore();
  return useMutation({
    mutationFn: editPosts,
    onSuccess: (data, post) => {
      createPost(data.data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      
    }
  });
};