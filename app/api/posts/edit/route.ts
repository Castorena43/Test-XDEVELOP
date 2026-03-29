import { NextResponse } from "next/server";
const BASE_URL = process.env.API_POSTS;

export async function PUT(req: Request) {
  try {
    const json = await req.json();
    const res = await fetch(`${BASE_URL}/posts/${json.id}`, {
      body: JSON.stringify(json),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'PUT'
    });
    const data = await res.json();
    const response = NextResponse.json(
      { ok: true, message: "success", data: data },
      { status: 200 }
    );

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al editar el post";
    return NextResponse.json(
      { message: message },
      { status: 500 }
    );
  }
}