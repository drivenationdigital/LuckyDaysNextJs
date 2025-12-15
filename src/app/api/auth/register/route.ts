import { API_URL, SESSION_COOKIE_NAME } from "@/actions/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const wpRes = await fetch(`${API_URL}/wp-json/next/v1/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!wpRes.ok) {
    const error = await wpRes.json();
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const data = await wpRes.json();
  const response = NextResponse.json(data);

  response.headers.set(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${data.token}; Path=/; HttpOnly; Secure; SameSite=None`
  );

  return response;
}
