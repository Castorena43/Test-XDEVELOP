import { useQuery } from "@tanstack/react-query";
import { getBooksByPageAction } from "../services/getBooksByPageAction";

export const usePaginatedBooks = (
  page: number,
  limit: number,
  query: string,
  author: string,
  year: number
) => {
  return useQuery({
    queryKey: ["books", { page, limit, query, author, year }],
    queryFn: () => getBooksByPageAction(+page, +limit, query, author, year),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};