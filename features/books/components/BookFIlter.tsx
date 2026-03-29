"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export type FilterForm = {
  query: string;
  author: string;
  year: number;
}

export default function BookFilter () {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { register, handleSubmit, reset } = useForm<FilterForm>({
    defaultValues: {
      query: '',
      author: '',
      year: 0
    }
  });

  const search = (data: FilterForm) => {
    if (!data.author && !data.query && !data.year) return;
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, String(value))
    })

    router.push(`${pathname}?${params.toString()}`);
  }

  const clean = () => {
    reset();
    const params = new URLSearchParams(searchParams.toString());
    params.delete('author');
    params.delete('query');
    params.delete('year');

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros de búsqueda</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_140px_auto]" onSubmit={handleSubmit(search)}>
          <Input id="query" placeholder="Buscar libros..." {...register('query')} />
          <Input id="author" placeholder="Autor" {...register('author')} />
          <Input id="year" type="number" min="0" placeholder="Año" {...register('year')} />

          <div className="flex items-center gap-2">
            <Button type="submit" className="w-full md:w-auto">
              Buscar
            </Button>
            <Button type="button" variant="outline" className="w-full md:w-auto" onClick={clean}>
              Limpiar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}