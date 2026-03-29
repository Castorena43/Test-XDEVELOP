"use client"

import { PaginationComponent } from "@/components/pagination/pagination";
import UserFilter from "./UserFilter";
import { UsersTable } from "./UserTable";
import { FormFilters } from "../types/user.types";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUsersByPage } from "../hooks/useUsersByPage";


export default function UsersComponent ({page}: {page: number}) {
  const [allDeleted, setAllDeleted] = useState<boolean>(false);
  const [filters, setFilters] = useState<FormFilters>({
    search: '',
    role: 'all'
});

  const { data: usersResponse } = useUsersByPage(page);

  const filteredUsers = useMemo(() => {
    if (!usersResponse?.data || allDeleted) return [];

    return usersResponse.data.filter(u => {
      return (!filters.search || `${u.first_name} ${u.last_name}`.includes(filters.search)) 
        && (filters.role === 'all' || !filters.role ? true : u.role === filters.role)
    });
  }, [usersResponse, filters, allDeleted]);

  const deleteUsers = () => {
    localStorage.setItem("usersDeleted", "true");
    setAllDeleted(true);
  }

  return (
    <>
      <UserFilter emitFilters={(data) => setFilters(data)} />
      <Button type="button" variant="destructive" className="py-4" onClick={deleteUsers}>
        Eliminar usuarios
      </Button>
      <UsersTable data={filteredUsers}/>

      <PaginationComponent
        totalPages={allDeleted ? 1 : usersResponse?.totalPages ?? 1}
      />
    </>
  )
}