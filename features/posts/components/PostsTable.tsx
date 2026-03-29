"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Post } from "../types/posts.types";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { LucideTrash2, PencilLine, Star, StarHalf } from "lucide-react";
import { useDeletePosts } from "../hooks/useDeletePosts";
import { usePostsStore } from "../store/posts.store";
import { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";
import { useAuthStore } from "@/features/auth/store/auth.store";

export function PostsTable({
  data,
}: {
  data: Post[];
}) {

  const { mutate } = useDeletePosts();
  const { setFavorite, favorites } = usePostsStore();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Post>();
  const { user } = useAuthStore();

  const handleDelete = (id: number) => {
    mutate(id)
  }

  const isFavorite = (id: number) => {
    return favorites.some(f => f === id);
  }

  const handleEdit = (data: Post) => {
    setEdit(data);
    setOpen(true);
  }

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Titulo",
    },
    {
      accessorKey: "body",
      header: "Descripcion",
    },
    {
      accessorKey: "userId",
      header: "Usuario",
    },
    {
      header: "Acciones",
      cell: ({row}) => (
        <ButtonGroup>
          <Button variant="outline" onClick={() => setFavorite(row.original.id)} className={`${isFavorite(row.original.id) ? 'bg-yellow-300' : ''} w-50px hover:bg-yellow-400`}>
            <Star />
          </Button>
          {
            user?.role === 'admin' && (
              <Button variant="outline" onClick={() => handleEdit(row.original)}>
                <PencilLine />
              </Button>
            )
          }
          <Button variant="outline" onClick={() => handleDelete(row.original.id)}>
            <LucideTrash2 />
          </Button>
        </ButtonGroup>
      )
    }
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
                No se encontraron usuarios para los filtros seleccionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <CreatePostModal
        open={open}
        onOpenChange={setOpen}
        dataEdit={edit}
      />
    </div>
  );
}