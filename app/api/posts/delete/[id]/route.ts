import { NextResponse } from "next/server";
const BASE_URL = process.env.API_POSTS;

export async function DELETE(req: Request, {params}: {params: Promise<{id:string}>}) {
  try {
    const {id} = await params;
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    const response = NextResponse.json(
      { ok: true, message: "success", data: data },
      { status: 200 }
    );

    return response;
  } catch (error) {
    const {id} = await params;
    const message = error instanceof Error ? error.message : `Error al eliminar el post con id ${id}`;
    return NextResponse.json(
      { message: message },
      { status: 500 }
    );
  }
}