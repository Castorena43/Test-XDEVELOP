"use client";

import { PaginationComponent } from "@/components/pagination/pagination";

import BookFilter from "./BookFIlter";
import { BooksTable } from "./BooksTable";
import { usePaginatedBooks } from "../hooks/usePaginatedBooks";

type BooksPageContentProps = {
  page: number;
  query: string;
  author: string;
  year: number;
};

const PAGE_SIZE = 20;

export default function BooksPageContent({ page, query, author, year, }: BooksPageContentProps) {
  const { data: booksResponse } = usePaginatedBooks( page, PAGE_SIZE, query, author, year );

  return (
    <>
      <BookFilter />

      <BooksTable data={booksResponse?.books ?? []} />

      <PaginationComponent totalPages={booksResponse?.totalPages ?? 0} />
    </>
  );
}