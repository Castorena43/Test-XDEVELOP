import { NextResponse } from "next/server";
import { LoginResponse } from "@/features/auth/types/auth.types";
import { apiRequest } from "@/utils/reqres-client";

export async function POST(req: Request) {
  try {
    
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "El email y la contraseña son obligatorios." },
        { status: 400 }
      );
    }

    // const data = await apiRequest<LoginResponse>("/login", {
    //   method: "POST",
    //   body: JSON.stringify({ email, password }),
    //   cache: "no-store",
    // });
    const data = {
      token: 'kdjskdskd'
    }

    const response = NextResponse.json(
      { ok: true, message: "Login exitoso.", token: data.token, expiresAt: Date.now() + 60 * 60 * 24 * 7 },
      { status: 200 }
    );

    response.cookies.set("accessToken", data.token, {
      httpOnly: false,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    const fakeRefreshToken = "refresh_" + Date.now();
    response.cookies.set("refreshToken", fakeRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600000, // 1 hour
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo iniciar sesión.";
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}