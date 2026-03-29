"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { FormFilters, ROLES } from "../types/user.types";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";



export default function UserFilter ({emitFilters}: {emitFilters: (data: FormFilters) => void}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FormFilters>({
    defaultValues: {
      search: '',
      role: ''
    }
  });

  const resetFilters = () => {
    reset();
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('role')
    router.push(`${pathname}?${params.toString()}`);
  }

  const search = (data: FormFilters) => {
    if (!data.role && !data.search ) return;
    emitFilters(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form className="grid gap-3 md:grid-cols-[minmax(0,2fr)_220px_auto_auto]" onSubmit={handleSubmit(search)}>
          <Input
            placeholder="Buscar por nombre o correo en la página actual"
            {...register('search')}
          />

          <select
            aria-label="Filtrar por rol"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            {...register('role')}
          >
            <option value="all">Todos los roles</option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <Button type="button" variant="outline" onClick={resetFilters}>
            Limpiar filtros
          </Button>
          <Button type="submit" variant="outline">
            Buscar
          </Button>
        </form>

      </CardContent>
    </Card>
  )
}