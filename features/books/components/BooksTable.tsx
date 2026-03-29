"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Book } from "../types/book.type";
import BookDetailModal from "./BookDetailModal";
import { useState } from "react";

export function BooksTable({
  data,
}: {
  data: Book[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState<Book>();

  const handleModal = (data: Book) => {
    setOpen(true);
    setBook(data);
  }

  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: "title",
      header: "Título",
    },
    {
      accessorKey: "author_name",
      header: "Autor",
      cell: ({ row }) => row.original.author_name?.join(", ") || "Sin autor",
    },
    {
      accessorKey: "first_publish_year",
      header: "Año",
      cell: ({ row }) => row.original.first_publish_year || "—",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 text-left font-semibold text-foreground">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-t border-border transition-colors hover:bg-muted/40"
                onClick={() => handleModal(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 align-middle text-muted-foreground">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-muted-foreground">
                No se encontraron libros para los filtros seleccionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <BookDetailModal open={open} onOpenChange={setOpen} book={book!} />
    </div>
  );
}