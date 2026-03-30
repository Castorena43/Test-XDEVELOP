"use client"

import { PaginationComponent } from "@/components/pagination/pagination";
import UserFilter from "./UserFilter";
import { UsersTable } from "./UserTable";
import { FormFilters } from "../types/user.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUsersByPage } from "../hooks/useUsersByPage";
import { useFilteredUsers } from "../hooks/useFilteredUsers";


export default function UsersComponent ({page}: {page: number}) {
  const [allDeleted, setAllDeleted] = useState<boolean>(false);
  const [filters, setFilters] = useState<FormFilters>({
    search: '',
    role: 'all'
});

  const { data: users } = useUsersByPage(page);

  const filteredUsers = useFilteredUsers({users: users?.data, filters, allDeleted});

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
        totalPages={allDeleted ? 1 : users?.totalPages ?? 1}
      />
    </>
  )
}