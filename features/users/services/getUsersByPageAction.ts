
import type {
  ReqResResponse,
  ReqResUsersResponse,
  UsersPageData,
  UserWithRole,
} from "../types/user.types";
import { fetchWithAuth } from "@/features/auth/services/fetchWithAuth";

export const getUsersByPageAction = async (
  page: number = 1
): Promise<UsersPageData> => {
  const response = await fetchWithAuth<ReqResResponse>(`api/users?page=${page}`);
  const result = response.data;
  const data: UserWithRole[] = result.data.map(u => ({
    ...u,
    role: u.id % 2 ? 'admin' : 'user'
  }))
  return {
    page: result.page,
    perPage: result.per_page,
    total: result.total,
    totalPages: result.total_pages,
    data: data
  };
};