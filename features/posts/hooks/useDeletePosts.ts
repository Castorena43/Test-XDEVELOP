import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePosts } from "../services/deletePost";
import { usePostsStore } from "../store/posts.store";
import { toast } from 'sonner';

export const useDeletePosts = () => {
  
  const queryClient = useQueryClient();
  const { markDeleted } = usePostsStore();
  return useMutation({
    mutationFn: deletePosts,
    onSuccess: (_data, id) => {
      markDeleted(id!);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast('Se ha eliminado la publicacion exitosamente')
    },
    onError: () => {
      toast('Error al eliminar la publicacion')
    }
  });
};