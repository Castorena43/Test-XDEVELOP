import { NextResponse } from "next/server";
const BASE_URL = process.env.API_POSTS;

export async function GET(req: Request, {params}: {params: {id:string}}) {
  try {
    const {id} = await params;
    const res = await fetch(`${BASE_URL}/posts/${params.id}`, {
      method: "GET",
    });
    const data = await res.json();
    const response = NextResponse.json(
      { ok: true, message: "success", data: data },
      { status: 200 }
    );

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al obtener posts por usuario";
    return NextResponse.json(
      { message: message },
      { status: 500 }
    );
  }
}