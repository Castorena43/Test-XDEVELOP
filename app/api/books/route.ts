import { NextResponse } from "next/server";
const BASE_URL = process.env.API_BOOKS;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const res = await fetch(`${BASE_URL}/search.json?${searchParams.toString()}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    const response = NextResponse.json(
      { ok: true, message: "success", data: data },
      { status: 200 }
    );

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo iniciar sesión.";
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}