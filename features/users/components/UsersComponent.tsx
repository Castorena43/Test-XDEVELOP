"use client"

import { PaginationComponent } from "@/components/pagination/pagination";
import UserFilter from "./UserFilter";
import { UsersTable } from "./UserTable";
import { FormFilters, UserWithRole } from "../types/user.types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUsersByPage } from "../hooks/useUsersByPage";


export default function UsersComponent ({page}: {page: number}) {

  const [users, setUser] = useState<UserWithRole[]>([]);
  const [allDeleted, setAllDeleted] = useState<boolean>(false);

  const { data: usersResponse } = useUsersByPage(page);

  useEffect(() => {
    const deleted = localStorage.getItem("usersDeleted");
    setAllDeleted(Boolean(deleted));
  }, []);

  const handleSearch = (data: FormFilters) => {
    if (allDeleted ) {
      return;
    }
    const { search, role } = data;
    if (!search && (!role || role === 'all')) {
      setUser(usersResponse?.data ?? []);
    } else {
      setUser((usersResponse?.data ?? []).filter(u => `${u.first_name} ${u.last_name}`.includes(search) && (role === 'all' ? true : u.role === role)))
    }
  }

  const deleteUsers = () => {
    localStorage.setItem("usersDeleted", "true");
    setAllDeleted(true);
    setUser([]);
  }

  return (
    <>
      <UserFilter emitFilters={handleSearch} />
      <Button type="button" variant="destructive" className="py-4" onClick={deleteUsers}>
        Eliminar usuarios
      </Button>
      <UsersTable data={users}/>

      <PaginationComponent
        totalPages={allDeleted ? 1 : usersResponse?.totalPages ?? 1}
      />
    </>
  )
}