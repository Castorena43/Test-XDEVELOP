
import type {
  ReqResUsersResponse,
  UsersPageData,
  UserWithRole,
} from "../types/user.types";
import { fetchWithAuth } from "@/features/auth/services/fetchWithAuth";

export const getUsersByPageAction = async (
  page: number = 1
): Promise<UsersPageData> => {
  const response = await fetchWithAuth<ReqResUsersResponse>(`api/users?page=${page}`);
  const data: UserWithRole[] = response.data.map(u => ({
    ...u,
    role: u.id % 2 ? 'admin' : 'user'
  }))
  return {
    page: response.page,
    perPage: response.per_page,
    total: response.total,
    totalPages: response.total_pages,
    data: data
  };
};