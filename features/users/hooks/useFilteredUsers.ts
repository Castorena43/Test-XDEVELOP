import { useMemo } from "react";
import { FormFilters, UserWithRole } from "../types/user.types";

type Props = {
  users: UserWithRole[] | undefined;
  filters: FormFilters;
  allDeleted: boolean;
};

export const useFilteredUsers = ({
  users,
  filters,
  allDeleted,
}: Props) => {
  return useMemo(() => {
    if (!users || allDeleted) return [];

    const { search, role } = filters;

    return users.filter((u) => (
      (!search || `${u.first_name} ${u.last_name}`.includes(search)) 
      && (role === 'all' || !role ? true : u.role === role)
    ));
  }, [users, filters, allDeleted]);
};