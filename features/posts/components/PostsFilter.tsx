"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BaseSyntheticEvent } from "react";
import { USERS } from "../types/posts.types";

export default function PostsFilter({emitFilter}: {emitFilter: (id: number) => void}) {

  const handleFilter = (event: BaseSyntheticEvent) => {
    emitFilter(event.target.value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <select
          aria-label="Filtrar por rol"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none"
          onChange={handleFilter}
        >
          <option value="0">Todos los usuarios</option>
          {USERS.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

      </CardContent>
    </Card>
  );
}