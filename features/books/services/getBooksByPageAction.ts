import { fetchWithAuth } from "@/features/auth/services/fetchWithAuth";
import type { BookData, BookResponse } from "../types/book.type";

export const getBooksByPageAction = async (
  page: number = 1,
  limit: number,
  query: string,
  author: string,
  year: number
): Promise<BookData> => {
  const apiPage = Math.ceil((page * limit) / 100);
  const params = new URLSearchParams();
  params.set("q", query.trim().length < 3 ? '' : query.trim());
  params.set("page", String(apiPage));

  if (author.trim()) {
    params.set("author", author.trim());
  }

  if (year > 0) {
    params.set("first_publish_year", String(year));
  }
  const response = await fetchWithAuth<{data: BookResponse}>(`api/books?${params.toString()}`, {
    method: "GET",
  });

  const startIndex = ((page - 1) * limit) % 100;
  const books = response.data.docs.slice(startIndex, startIndex + limit);

  return {
    books: books,
    totalItems: response.data.numFound,
    totalPages: Math.max(1, Math.ceil(response.data.numFound / limit)),
    page: page,
  };
};