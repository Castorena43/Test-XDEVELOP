import UsersComponent from "@/features/users/components/UsersComponent";

type UsersPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Usuarios</h1>
      </div>

      <UsersComponent
        page={page}
      />
    </div>
  );
}
