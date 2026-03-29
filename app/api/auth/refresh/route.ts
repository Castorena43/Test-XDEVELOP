import { NextRequest, NextResponse } from "next/server";

import { VerifyResponse } from "@/features/auth/types/auth.types";
import { apiRequest } from "@/utils/reqres-client";


export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const token = req.cookies.get('accessToken')?.value;
  
    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }
  
    const data = await apiRequest<VerifyResponse>("/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
      credentials: "include"
    });

    const response = NextResponse.json({
      token: token,
      expiresAt: 60 * 60 * 24 * 7, // 10 minutos
    }, {status: 200});

    response.cookies.set("accessToken", data.token, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 10 minutos
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Verify failed" }, { status: 401 });
  }
}
