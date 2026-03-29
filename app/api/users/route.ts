import { NextResponse } from "next/server";
import { apiRequest } from "@/utils/reqres-client";
import { ReqResUsersResponse } from "@/features/users/types/user.types";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");  

    const data = await apiRequest<ReqResUsersResponse>(`/users?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });

    const response = NextResponse.json(
      { ok: true, message: "success", data: data },
      { status: 200 }
    );

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo obtener sesión.";
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}