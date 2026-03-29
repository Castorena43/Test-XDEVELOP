import { NextRequest, NextResponse } from "next/server";
const BASE_URL = process.env.API_POSTS;

export async function GET(req: NextRequest, {params}: {params: {id:number}}) {
  try {
    const {id} = await params;

    const url = new URL(`${BASE_URL}/posts`);

    if (id > 0) {
      url.searchParams.set("userId", String(id));
    }
    
    const res = await fetch(url.toString(), {
      method: 'GET'
    });
    const data = await res.json();
    const response = NextResponse.json(
      { ok: true, message: "success", data: data },
      { status: 200 }
    );

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al obtener posts";
    return NextResponse.json(
      { message: message },
      { status: 500 }
    );
  }
}