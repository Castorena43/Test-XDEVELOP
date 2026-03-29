export type UserRole = "admin" | "user";

export const ROLES: UserRole[] = ["admin", "user"];

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserWithRole extends User {
  role: UserRole;
}

export interface ReqResUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface UsersPageData {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: UserWithRole[];
}

export type FormFilters = {
  search: string;
  role: string;
}