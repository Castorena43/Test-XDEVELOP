"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { UserRole, UserWithRole } from "../types/user.types";

const getRoleBadgeClasses = (role: UserRole) => {
  switch (role) {
    case "admin":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300";
  }
};

export function UsersTable({
  data,
}: {
  data: UserWithRole[];
}) {
  const router = useRouter();

  const columns: ColumnDef<UserWithRole>[] = [
    {
      accessorKey: "title",
      header: "Usuario",
      cell: ({row}) => (`${row.original.first_name} ${row.original.last_name}`)
    },
    {
      accessorKey: "email",
      header: "Correo",
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({row}) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getRoleBadgeClasses(
            row.original.role
          )}`}
        >
          {row.original.role}
        </span>
      )
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
    </div>
  );
}