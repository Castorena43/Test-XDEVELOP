import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostsStore } from "../store/posts.store";
import { createPosts } from "../services/createPosts";
import { toast } from 'sonner';


export const useCreatePosts = () => {
  
  const queryClient = useQueryClient();
  const { createPost } = usePostsStore();
  return useMutation({
    mutationFn: createPosts,
    onSuccess: (data, post) => {
      createPost(data.data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast('Se ha creado la publicacion exitosamente')
    },
    onError: (error) => {
      toast('Error al crear la publicacion')
    }
  });
};