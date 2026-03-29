import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostsStore } from "../store/posts.store";
import { editPosts } from "../services/editPosts";
import { toast } from 'sonner';

export const useEditPosts = () => {
  
  const queryClient = useQueryClient();
  const { createPost } = usePostsStore();
  return useMutation({
    mutationFn: editPosts,
    onSuccess: (data, post) => {
      createPost(data.data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast('Se ha editado la publicacion exitosamente')
    },
    onError: (error) => {
      toast('Error al editar la publicacion')
    }
  });
};