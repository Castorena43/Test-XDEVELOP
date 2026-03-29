
import { useQuery } from "@tanstack/react-query";
import { getUsersByPageAction } from "../services/getUsersByPageAction";

export const useUsersByPage = (
  page: number,
) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsersByPageAction(page),
    staleTime: 1000 * 60 * 1, // 5 minutos
  });
};