import BooksPageContent from "@/features/books/components/BooksPageContent";

type BooksPageProps = {
  searchParams: Promise<{
    page?: string;
    query?: string;
    author?: string;
    year?: string;
  }>;
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const query = params.query ?? "";
  const author = params.author ?? "";
  const year = Number(params.year ?? "0");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Libros</h1>
      <BooksPageContent
        page={page}
        query={query}
        author={author}
        year={year}
      />
    </div>
  );
}