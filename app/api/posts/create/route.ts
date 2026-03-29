import { NextResponse } from "next/server";
const BASE_URL = process.env.API_POSTS;

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const res = await fetch(`${BASE_URL}/posts`, {
      body: JSON.stringify(json),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'POST'
    });
    const data = await res.json();
    const response = NextResponse.json(
      { ok: true, message: "success", data: data },
      { status: 200 }
    );

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al crear el post";
    return NextResponse.json(
      { message: message },
      { status: 500 }
    );
  }
}